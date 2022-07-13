<template>
  <main class="app">
    <h1>Тесты с вопросами и ответами</h1>
    <section class="quiz" v-if="!isCompleted">
      <div class="quiz-info">
        <span class="question">{{ current.question }}</span>
        <span class="score">Очки {{ score }} / {{ countQuestions }}</span>
      </div>
      <div class="options">
        <QuestionItem
            v-for="(option, index) in current.options"
            :key="index"
            :question="option"
            :indexKey="index"
        />
      </div>
      <NextButton/>
    </section>
    <section v-else>
      <h2>Поздравляем Вы ответили на все вопросы</h2>
      <p>Вы заработали очков {{ score }} / {{ countQuestions }}</p>
      <br/>
      <button @click="restartQuiz">Попробовать еще раз</button>
    </section>
  </main>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import {useStore} from 'vuex'
import QuestionItem from './components/QuestionItem.vue'
import NextButton from './components/NextButton.vue'

const store = useStore();

const current = computed(() => store.getters.getCurrentQuestion);
const isCompleted = computed(() => store.state.quizCompleted);
const score = computed(() => store.getters.countCorrect)
const countQuestions = computed(() => store.state.questions.length)

const restartQuiz = () => {
  store.commit('restartQuiz');
  store.dispatch('startShuffle');
}

onMounted(()=>{
  store.dispatch('startShuffle')
})

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

body {
  background: #271c36;
  color: #fff;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
}

h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}

section {
  display: flex;
  flex-direction: column;
}

.quiz {
  background: #382a4b;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap:15px;

  .question {
    color: #8f8f8f;
    font-size: 1.125rem;
  }

  .score {
    color: #fff;
    font-size: 1.25rem;
    white-space: nowrap;
  }
}

.options {
  margin-bottom: 1rem;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background: #2cce7d;
  color: #2d213f;
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 10px;
  margin: 0 auto;

  &:disabled {
    opacity: .5;
  }
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

p {
  color: #8f8f8f;
  font-size: 1.25rem;
  text-align: center;
}
</style>
