<template>
  <div class="select">
    <Input
      :label="t('blog.title')"
      v-model="title"
      name="title"
      :placeholder="t('blog.titlePlaceHolder')"
    />
    <Input
      :label="t('blog.tag')"
      v-model="tagText"
      name="tag"
      :placeholder="t('blog.tagPlaceHolder')"
    />
    <MySelect
      :localdata="selectOptions"
      :label="t('blog.sort')"
      @change="(option) => (paginations.sort = option.value)"
    />
    <Button
      type=""
      @click="getBlog(paginations.pageNum, paginations.pageSize)"
      >{{ t("blog.filter") }}</Button
    >
  </div>

  <div
    @click="router.push('/detail?id=' + item.id)"
    v-for="(item, index) in list"
    :key="index"
    class="item"
  >
    <div>
      {{ item.title }}
    </div>

    <div class="tagList">
      <Tag v-for="tagItem in item.tag" :text="tagItem.content" class=""></Tag>
      <div>
        {{ item.lasttime.split("T")[0] }}
      </div>
    </div>
  </div>
  <Pagination
    @pageChange="change"
    :total="paginations.total"
    :currentPage="paginations.pageNum"
  ></Pagination>
  <FloatBtn :list="btn" right="50px" bootom="50px"></FloatBtn>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getBlogListApi } from "@renderer/api/blog";
import { useStore } from "@renderer/stores/index";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const stores = useStore();
const router = useRouter();
const route = useRoute();

const list: Ref<any> = ref([]);

const selectOptions = [
  {
    text: "综合",
    value: "none",
  },
  {
    text: "最热",
    value: "hot",
  },
  {
    text: "最新",
    value: "new",
  },
];

const change = (e) => {
  getBlog(e, paginations.value.pageSize);
};

const btn = [
  {
    content: "+",
    fun: () => {
      router.push("/add");
    },
  },
];

// 列表相关
const title = ref("");
const tagText = ref("");
const paginations = ref({
  pageNum: 1,
  pageSize: 5,
  total: 0,
  sort: "",
});

const getBlog = async (pageNum?: number, pageSize?: number) => {
  const res = await getBlogListApi(
    stores.userInfo?.uid || "",
    pageNum,
    pageSize,
    title.value,
    tagText.value,
    paginations.value.sort
  );
  if (res) {
    list.value = res.records;
    paginations.value = {
      ...paginations.value,
      pageNum: res.current,
      total: res.total,
    };
  }
};

onMounted(() => {
  getBlog(paginations.value.pageNum, paginations.value.pageSize);
});
</script>

<style scoped lang="scss">
.select {
  display: flex;
  align-items: center;
}
.container {
  height: 30vh;
  // max-height: 90vh;
  // max-width: 90vw;
  // margin: 10px 0;
  // grid布局方式：瀑布流
  overflow: auto;
}

.item {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 15px;
  margin: 16px;
  // width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // flex-direction: column;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

  .tagList {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  // width: 230px;
  // width: 100%;

  // cursor: pointer;
  // float: left;
  // img {
  //     width: 100%;
  // }
}

.item:hover {
  transition: box-shadow 0.5s;
  box-shadow: 0 2px 4px black;
}
</style>
