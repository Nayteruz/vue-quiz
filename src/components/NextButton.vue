<template>
  <button
      @click="nextQuestion"
      :disabled="current.selected == null"
  >
    {{ buttonText }}
  </button>
</template>

<script setup>
import {computed} from "vue";

import {useStore} from 'vuex'

const store = useStore();

const current = computed(() => store.getters.getCurrentQuestion);

const buttonText = computed(() => {
  return `${current.index === store.state.questions.length - 1
      ? 'Финиш'
      : current.selected === null
          ? 'Выберите ответ'
          : 'Следующий вопрос'}`
})

const nextQuestion = () => {
  if (store.state.currentQuestion < store.state.questions.length - 1) {
    store.commit('incrementCurrent');
  } else {
    store.commit('setQuizCompleted', true)
  }
}
</script>

<style scoped>

</style>