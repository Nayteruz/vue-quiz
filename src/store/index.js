import {createStore} from "vuex";


export const useStoreQuestions = createStore({
    state() {
        return {
            questions: [
                {
                    question: 'Из какого фильма Прекрасный принц?',
                    answer: '0',
                    options: [
                        'Золушка',
                        'Русалочка',
                        'Спящая красавица',
                        'Мулан',
                    ],
                    selected: null
                },
                {
                    question: 'Какой герой мультфильма живет в ананасе под водой?',
                    answer: '3',
                    options: [
                        'Камбала',
                        'Немо',
                        'Рик и Морти',
                        'Губка Боб Квадратные Штаны'
                    ],
                    selected: null
                },
                {
                    question: 'Какая страна производит больше всего кофе в мире?',
                    answer: '2',
                    options: [
                        'Колумбия',
                        'Индонезия',
                        'Бразилия',
                        'Вьетнам',
                    ],
                    selected: null
                },
                {
                    question: 'Как называются четыре Факультета Хогвартса?',
                    answer: '0',
                    options: [
                        'Гриффиндор, Пуффендуй, Когтевран и Слизерин',
                        'Грифон, Ворон, Слон и Змея',
                        'Север, Восток, Запад и Юг',
                        'Красный, Синий, Зеленый и Оранжевый',
                    ],
                    selected: null
                },
                {
                    question: 'Какой безалкогольный напиток первым был взят в космос?',
                    answer: '2',
                    options: [
                        'Пепси',
                        'Фанта',
                        'Кока-Кола',
                        'Снапл',
                    ],
                    selected: null
                },
                {
                    question: 'Какая игрушка была первой, которую рекламировали по телевидению?',
                    answer: '1',
                    options: [
                        'Барби',
                        'Мистер Картофельная Голова',
                        'Духовка с Легкой Выпечкой',
                        'Ракетный Гонщик',
                    ],
                    selected: null
                }
            ],
            currentQuestion: 0,
            quizCompleted: false
        }
    },
    getters: {
        countCorrect(state) {
            return state.questions.filter(q => q.answer == q.selected).length;
        },
        getCurrentQuestion(state) {
            let q = state.questions.filter((q, i) => i === state.currentQuestion)[0];
            q.index = state.currentQuestion
            return q;
        },
    },
    mutations: {
        setAnswer(state, answer) {
            state.questions[state.currentQuestion].selected = answer
        },
        incrementCurrent(state) {
            state.currentQuestion++;
        },
        setQuizCompleted(state, stateCompleted = false) {
            state.quizCompleted = stateCompleted;
        },
        restartQuiz(state) {
            state.currentQuestion = 0;
            state.quizCompleted = false;
            for (let q of state.questions){
                q.selected = null;
            }
        },
        shuffle(state) {
            state.questions = state.questions
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
        }
    },
    actions: {
        startShuffle(context){
            context.commit('shuffle')
        }
    }
})
