<template>
  <div class="main-card" :style="{ background: cardData.bgcolor }">
    <div class="card-header">
      <p class="card-photo"><img src="" alt="" /></p>
      <p class="card-username">{{ cardData.userName }}</p>
      <p class="card-options"></p>
    </div>
    <div ref="scrollContainer" class="card-text" @wheel="handleScroll">
      {{ cardData.text }}
    </div>
    <div class="card-footer">
      <p class="card-like" :style="{ color: likeactive }" @click="like">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-heart"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
      </p>
      <p class="card-likeamount">{{ cardData.likes }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: { CardID: Number },

  data() {
    return {
      cardData: {
        userName: "",
        text: "",
        img: "",
        likes: Number,
        bgcolor: "",
      },
      likeactive: "",
    };
  },

  watch: {
    CardID: {
      immediate: true,
      handler(newCardID) {
        // Выполнение логики при изменении CardID
        console.log("CardID изменен:", newCardID);
        // Здесь вы можете вызвать функцию, которая обновит данные карточки
        this.fetchCardData(newCardID);
      },
    },
  },

  methods: {
    like() {
      if (this.likeactive) {
        return;
      }
      this.likeactive = "red";
      this.cardData.likes++;

      // обновляем колво лайков в базе данных
      fetch(`http://localhost:3000/updateLike?CardID=${this.CardID}`);
    },
    handleScroll(event) {
      event.preventDefault();

      const delta = event.deltaY || event.detail || event.wheelDelta;
      const scrollSpeed = 0.3;

      const scrollContainer = this.$refs.scrollContainer;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollTop + delta * scrollSpeed,
        behavior: "smooth",
      });
    },
    fetchCardData() {
      fetch(`http://localhost:3000/getCard?CardID=${this.CardID}`)
        .then((r) => r.json())
        .then((data) => {
          this.cardData.userName = data.userName;
          this.cardData.text = data.text;
          this.cardData.likes = data.likes;
          this.cardData.bgcolor = data.bgcolor;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.main-card {
  font-family: monospace;
  color: #fafafa;
  text-transform: uppercase;
  border: 2px solid #fafafa;
  background: #252525;
  box-shadow: 3px 3px #fafafa;
  border-radius: 10px;

  width: 450px;
  max-height: 300px;
  padding: 10px 10px;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.card-photo {
  width: 40px;
  height: 40px;
  border: 2px solid white;
  border-radius: 50%;
  margin-right: 10px;
}

.card-username {
  font-size: 1rem;
}

.card-text {
  max-height: 70px;
  padding-right: 10px;
  overflow-y: scroll;
  text-overflow: ellipsis;
  text-transform: none;
  margin-bottom: 15px;
  font-size: 1rem;
}

.card-text::-webkit-scrollbar {
  width: 5px;
  background-color: #6c0aab;
}

.card-text::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: white;
}

.card-text::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #6c0aab;
}

.card-footer {
  height: 25px;
  display: flex;
  align-items: center;
  padding-left: 15px;
}

.card-like {
  width: 25px;
  height: 25px;
  margin-right: 15px;
  cursor: pointer;
}

.card-likeamount {
  font-size: 1rem;
}
</style>
