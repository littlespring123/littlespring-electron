<template>
  <div class="root">
    <!-- 目录 -->

    <ul class="catalogy">
      {{
        t("blog.categorize")
      }}
      <li
        class="item"
        v-for="item of valueHtml.toc"
        :key="item.id"
        @click="toTarget(item.id)"
        :class="{ active: currentTitle.id === item.id }"
        :style="{ 'padding-left': (item.tag - valueHtml.maxTitle) * 10 + 'px' }"
      >
        {{ item.text }}
      </li>
    </ul>
    <div class="box">
      <div class="head">
        <h3 class="title">{{ detail.title }}</h3>
        <div class="tags">
          <Tag :text="item.content" circle v-for="item in detail.tag" />
        </div>
        <div>{{ detail.date }}</div>
      </div>
      <div
        class="detail-content"
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
import { getBlogApi } from "@renderer/api/blog";
import { marked } from "marked";
import { md2html } from "@renderer/utils/txt2md";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
interface NodeType {
  name?: string;
  id?: number | string;
  level?: number;
  parent?: any;
  children?: [];
  rawName?: string;
  scrollTop?: number;
  isVisible?: boolean;
}

const valueHtml = ref("");
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
      console.log(currentTitle.value.id, toc[i].id);
      currentTitle.value = { ...currentTitle.value, id: i + 1 };
      break;
    }
  }
};

// window.addEventListener('scroll', function () {
//     console.log('widnow',window.scrollY)
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
.root {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4px;
  margin: 5px;

  .box {
    width: 70%;
    max-height: 75vh;
    border: 1px solid #ccc;
    max-width: 70vw;
    padding: 4px;

    .head {
      display: flex;
      flex-direction: column;
      text-align: center;

      .title {
        text-align: center;
      }
      .tags {
        display: flex;
        margin: 3px 0;
        justify-content: center;
      }
    }

    .detail-content {
      padding: 10px;
      max-height: 70vh;
      overflow: hidden;
      border: 1px solid #ccc;
    }
    .detail-content:hover {
      overflow: auto;
    }
  }

  .catalogy {
    border: 1px solid #ccc;
    overflow: hidden;
    top: 20vh;
    // right: 3vw;
    max-width: 18vw;
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

  .catalogy:hover {
    overflow: auto;
  }
}

.active {
  background-color: green;
}
</style>
