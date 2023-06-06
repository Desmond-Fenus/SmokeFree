<template>
  <div class="main">
    <div class="header">
      <a href="" class="logo">SmokeFree Voices</a>
      <button
        class="login-button button"
        v-if="!autorizated"
        @click="autorization = true"
      >
        Log In
      </button>
      <p class="name" v-if="autorizated">{{ userName }}</p>
    </div>
    <dialog :open="autorization" class="autorization-dialog">
      <h2>Hi! Whats ur name?)</h2>
      <div class="autorization-dialog__form">
        <form @submit.prevent="saveUser(userName)">
          <input
            type="text"
            v-model="userName"
            placeholder="Your name"
            minlength="3"
            required
          /><button type="submit" class="button">Log in</button>
        </form>
      </div>
    </dialog>
    <div class="information">
      <div class="description">
        <p>
          <span class="title-span"><strong>We understand</strong></span
          ><br />
          that quitting smoking can be challenging and may come with
          difficulties. However, many people have already gone through this
          process and gained valuable experience that can help others.
        </p>

        <p>
          <span class="title-span"><strong>That's why</strong></span
          ><br />
          we invite you to share your experience and story of quitting smoking.
          Together, we can create a supportive environment where everyone can
          find help and inspiration from those who have walked a similar path.
        </p>

        <p>
          <span class="title-span"><strong>Whether</strong></span
          ><br />
          you have successfully quit smoking or are currently attempting to do
          so, please share your successes, challenges, and what has helped you
          stay motivated. Your words and advice can become a valuable source of
          support for those who are just starting their journey towards a
          smoke-free and healthier life.
        </p>

        <p>
          <span class="title-span"><strong>We believe</strong></span
          ><br />
          that community and collective participation can have a tremendous
          impact. Let's support each other and share our stories in the comments
          below. Together, we can achieve more and help others find freedom from
          smoking.
        </p>

        <p>
          <em>Note:</em> Quitting smoking is a highly individual experience, and
          people may go through it differently. Please remember to be
          respectful, supportive, and kind in your comments, as your words can
          influence others.
        </p>
      </div>
      <div class="examples">
        <div
          v-for="(margin, index) in margins"
          :key="margin"
          :style="{ marginLeft: margin }"
          class="random-place"
        >
          <UserCard :CardID="posts[index]" />
        </div>
      </div>
    </div>
    <footer class="footer">All Rights Reserved &copy; 2023</footer>
  </div>
</template>

<script>
import UserCard from "./components/cardComponent.vue";
export default {
  components: {
    UserCard,
  },
  data() {
    return {
      autorizated: false,
      autorization: false,
      userName: "",
      margins: [],
      amountOfCards: Number,
      posts: [],
    };
  },

  mounted() {
    // проверка пользователя
    let log = localStorage.getItem("userName");
    if (log) {
      this.autorizated = true;
      this.userName = log;
    }
    fetch("http://localhost:3000/getAmountOfCards")
      .then((response) => response.json())
      .then((data) => {
        this.mountOfCards = data;
        this.generateRandomNumbers();
      })
      .catch((error) => {
        console.error(error);
      });
    // генерируем рандомный марджин
    this.generateMargins();
  },

  methods: {
    // запоминаем пользователя и сохраняем на компе
    saveUser(userName) {
      localStorage.setItem("userName", userName);
      this.autorization = false;
      this.autorizated = true;
    },
    // Генерируем рандомные марджины для отображения карточек на главной странице
    generateMargins() {
      for (let i = 0; i < 4; i++) {
        const randomMargin = Math.floor(Math.random() * 500) + "px";
        this.margins.push(randomMargin);
        console.log(randomMargin);
      }
    },
    // Генерируем рандомные ИД для карточек
    generateRandomNumbers() {
      const numbers = [];
      while (numbers.length < 4) {
        const randomNumber = Math.floor(Math.random() * this.mountOfCards) + 1;
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
      }
      this.posts = numbers;
      console.log(this.posts);
    },
  },
};
</script>

<style>
.main {
  width: 1440px;
  height: 100vh;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
}

.header {
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.logo {
  display: block;
  font-size: 1.5rem;
  color: #1a1818;
  text-transform: uppercase;
  text-decoration: none;
}

.button {
  font-family: monospace;
  font-size: 1.5rem;
  color: #fafafa;
  text-transform: uppercase;
  border: 2px solid #fafafa;
  background: #252525;
  box-shadow: 3px 3px #fafafa;
  cursor: pointer;
  border-radius: 10px;
}

.button:active {
  box-shadow: none;
  transform: translate(3px, 3px);
}

.login-button {
  font-family: monospace;
  font-size: 1.5rem;
  color: #fafafa;
  text-transform: uppercase;
  padding: 10px 20px;
  height: 55px;
  border-radius: 10px;
  border: 2px solid #fafafa;
  background: #252525;
  box-shadow: 3px 3px #fafafa;
  cursor: pointer;
}

.name {
  font-family: monospace;
  font-size: 1.5rem;
  color: #1a1818;
  text-transform: uppercase;
  cursor: pointer;
}

.autorization-dialog {
  top: 40%;

  width: 450px;
  font-family: monospace;
  font-size: 1.5rem;
  color: #fafafa;
  text-transform: uppercase;
  border-radius: 10px;
  border: 2px solid #fafafa;
  background: #252525;
  box-shadow: 3px 3px #fafafa;
}

.autorization-dialog h2 {
  margin-block: 0px 25px;
}

.autorization-dialog__form {
  display: flex;
  justify-content: space-between;
  height: 40px;
}

.autorization-dialog__form form {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.autorization-dialog input {
  border-radius: 10px;
  width: 275px;
  border: 2px solid #fafafa;
  font-family: monospace;
  font-size: 1.5rem;
  color: #fafafa;
  background: #252525;
  box-shadow: 3px 3px #fafafa;
}

.information {
  display: flex;

  flex-grow: 1;
}

.description {
  flex-basis: 33.33%;

  height: 100%;
  display: flex;
  flex-direction: column;
}

.description p {
  height: auto;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.description p:last-child {
  margin-top: auto;
}

.title-span {
  font-size: 1.2rem;
  display: block;
}

.examples {
  flex-basis: 66.66%;
  display: flex;
  flex-direction: column;
}

.footer {
  text-align: end;
  margin-bottom: 5px;
}
.random-place {
  flex: 1;
  cursor: default;
}
</style>
