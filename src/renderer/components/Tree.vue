<template>
    <div class="tree-node">
        <span @click="toggleNode">
            <i :class="`icon ${isOpen ? 'icon-open' : 'icon-closed'}`"></i>
            {{ node?.name }}
        </span>
        <ul v-if="isOpen">
            <Tree v-for="childNode in node?.children" :key="childNode.id" :node="childNode"></Tree>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
defineProps({
    node: Object,
})
const isOpen = ref(false)

const toggleNode = () => {
    isOpen.value = !isOpen.value;
}
</script>

<style scoped>
.tree-node {
    margin-left: 20px;
    /* 缩进节点以表示层次关系 */
}

.icon {
    margin-right: 5px;
    cursor: pointer;
}

.icon-open::before {
    content: '▼';
}

.icon-closed::before {
    content: '▶';
}
</style>
