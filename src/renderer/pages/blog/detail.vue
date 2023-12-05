<template>
  <div class="root block-z-index">
    <!-- 目录 -->
    <div class="catalogy">
      {{ t("blog.categorize") }}
      <div
        class="item"
        v-for="item of valueHtml.toc"
        :key="item.id"
        @click="toTarget(item.id)"
        :class="{ active: currentTitle.id === item.id }"
        :style="{
          'padding-left': (item.tag - valueHtml.maxTitle) * 10 + 'px',
        }"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="box">
      <div class="head">
        <h2 class="title">{{ detail.title }}</h2>
        <div class="tags">
          <div>
            <Tag :text="item.content" circle v-for="item in detail.tag" />
          </div>
          <div>{{ detail.lasttime }} 浏览量: {{ detail.count }}</div>
        </div>
      </div>
      <div
        v-highlight
        class="detail-content markdown-body"
        v-html="valueHtml.content"
        @scroll="onScroll"
      ></div>
    </div>
  </div>

  <FloatBtn :list="btn" right="50px" bootom="50px"></FloatBtn>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NodeType } from "./types.d";
import { getBlogApi } from "@renderer/api/blog";
import { marked } from "marked";
import { md2html } from "@renderer/utils/txt2md";
import { useI18n } from "vue-i18n";
import { useStore } from "@renderer/stores";
import { storeToRefs } from "pinia";
const store = useStore();
const { color, backgroundColor, themeColor } = storeToRefs(store);
const { t } = useI18n();

const valueHtml = ref({
  content: "",
  toc: [],
  maxTitle: 0,
});
const { query } = useRoute();
const router = useRouter();
const detail = ref({});

// 悬浮按钮
const btn = [
  {
    content: "M",
    fun: () => {
      router.push("/add?id=" + query?.id);
    },
  },
];

const currentTitle: Ref<NodeType> = ref({
  id: 0,
});
// let selfTitle=ref([])

const getBlogDet = async () => {
  const res = await getBlogApi(Number(query?.id));
  if (res) {
    detail.value = res;
    valueHtml.value = md2html(detail.value.content);
    console.log(
      "valueHtml",
      valueHtml.value,
      detail.value.content,
      detail.value.title
    );
  }
};
getBlogDet();

const toTarget = (target: any) => {
  target = "#toc-nav" + target;
  let toElement = document.querySelector(target);
  toElement.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
};

// 监听滚动事件并更新样式
const onScroll = (e: any) => {
  let scrollItems = document.querySelectorAll(".item");
  for (let i = scrollItems.length - 1; i >= 0; i--) {
    // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
    let judge =
      e.target.scrollTop >= scrollItems[i].offsetTop - scrollItems[0].offsetTop;
    if (judge) {
      currentTitle.value = { ...currentTitle.value, id: i + 1 };
      break;
    }
  }
};

// window.addEventListener('scroll', function () {
//     for (let i = toc.length - 1; i >= 0; i--) {
//         const title: NodeType = toc[i];
//         if (title?.scrollTop && title.scrollTop <= window.scrollY) {
//             if (currentTitle.value.id === title.id) {
//                 return;
//             }
//             currentTitle.value = title
//             // Object.assign(currentTitle, title);
//             return;
//         }
//     }
// });
</script>

<style scoped lang="scss">
@import "github-markdown-css";
.root {
  width: 100%;
  display: flex;
  justify-content: center;
  // padding: 4px;
  // margin: 5px;

  .box {
    width: 80vw;
    max-height: 85vh;
    border: 1px solid #ccc;
    // max-width: 70vw;
    // padding: 4px;

    .head {
      display: flex;
      flex-direction: column;
      text-align: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 3px;

      .title {
        text-align: center;
      }
      .tags {
        display: flex;
        margin: 10px 0;
        justify-content: space-between;
      }
    }

    .detail-content {
      padding: 10px;
      max-height: 70vh;
      overflow: hidden;
      // border: 1px solid #ccc;
    }
    .detail-content:hover {
      overflow: auto;
    }
  }

  .catalogy {
    border: 1px solid #ccc;
    overflow: hidden;
    // top: 20vh;

    // right: 3vw;
    padding: 3px;
    // max-width: 18vw;
    width: 15vw;
    max-height: 60vh;

    .item {
      max-width: 50vw;
      overflow: hidden;
      cursor: pointer;
      list-style: none;
    }

    .item:hover {
      text-decoration: underline;
    }
  }

  // .catalogy:hover {
  //   overflow: auto;
  // }

  .catalogy::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
    border-radius: 0;
    transition: background-color 2s ease;
  }

  .catalogy:hover::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0;
    transition: background-color 2s ease;
  }

  .catalogy::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 6px;
    transition: background-color 2s ease;
    // display: none;
    // opacity: 0;
  }

  .catalogy:hover::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 6px;
    transition: background-color 2s ease;
    // display: inline !important;
    // opacity: 1;
  }

  .catalogy::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0);
    transition: background-color 2s ease;
  }

  .catalogy:hover::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.15);
    transition: background-color 2s ease;
  }
}

.active {
  background-color: v-bind(themeColor);
}
</style>
