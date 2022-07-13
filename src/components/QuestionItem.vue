<template>
  <label
    class="option"
    :class="{
      'correct' : current.answer == current.selected && current.selected == indexKey,
      'wrong' : current.answer != current.selected && current.selected == indexKey,
      'disabled' : current.selected != null && current.selected != indexKey
    }"
  >
    <input
      type="radio"
      :name="current.index"
      :value="indexKey"
      :disabled="current.selected != null"
      v-model="selectQuestion"
      @change="setChange"
    >
    <span>{{ question }}</span>
  </label>
</template>

<script setup>
import {computed, defineProps, ref} from "vue";
  import { useStore } from 'vuex'

  const props = defineProps({
    'question' : String,
    'indexKey' : Number,
  })

  const store = useStore();

  const current = computed(()=>{
    return store.getters.getCurrentQuestion
  });

  const selectQuestion = ref(null);

  const setChange = () => {
    store.commit('setAnswer', selectQuestion.value);
    selectQuestion.value = null;
  }



</script>

<style scoped lang="scss">
.option {
  padding: 1rem;
  display: block;
  background: #271c36;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #2d213f;
  }

  &.correct {
    background: #2cce7d;
  }

  &.wrong {
    background: #ff5a5f;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &.disabled {
    opacity: 0.5;
  }

  & input {
    display: none;
  }
}
</style>