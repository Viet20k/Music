const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
console.log($);
const player = $(".player");

const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeaBtn = $(".btn-repeat");
const playlist = $(".playlist");
console.log(prevBtn);
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "cầu vồng khuyết",
      singer: "Tuấn Hưng",
      path: "./mp3/cauvongkhuyet.mp3",
      image: "./img/anh1.jpg",
    },
    {
      name: "you want kiss me",
      singer: "hên xui ",
      path: "./mp3/you want kiss me.mp3",
      image: "./img/anh2.jpg",
    },
    {
      name: "cầu vồng khuyết",
      singer: "Tuấn Hưng",
      path: "./mp3/cauvongkhuyet.mp3",
      image: "./img/anh1.jpg",
    },
    {
      name: "cầu vồng khuyết",
      singer: "Tuấn Hưng",
      path: "./mp3/cauvongkhuyet.mp3",
      image: "./img/anh1.jpg",
    },
    {
      name: "cầu vồng khuyết",
      singer: "Tuấn Hưng",
      path: "./mp3/cauvongkhuyet.mp3",
      image: "./img/anh1.jpg",
    },
    {
      name: "cầu vồng khuyết",
      singer: "Tuấn Hưng",
      path: "./mp3/cauvongkhuyet.mp3",
      image: "./img/anh1.jpg",
    },
    {
      name: "cầu vồng khuyết",
      singer: "Tuấn Hưng",
      path: "./mp3/cauvongkhuyet.mp3",
      image: "./img/anh1.jpg",
    },
    {
      name: "cầu vồng khuyết",
      singer: "Tuấn Hưng",
      path: "./mp3/cauvongkhuyet.mp3",
      image: "./img/anh1.jpg",
    },
    {
      name: "cầu vồng khuyết",
      singer: "Tuấn Hưng",
      path: "./mp3/cauvongkhuyet.mp3",
      image: "./img/anh1.jpg",
    },
  ],
  render: function () {
    const html = this.songs.map((song, index) => {
      return `
       <div class="song ${index === this.currentIndex ? "active" : ""}">
          <div
            class="thumb"
            style="
              background-image: url('${song.image}')
            "
          ></div>
          <div class="body">
            <h3 class="title">'${song.name}'</h3>
            <p class="author">'${song.singer}'</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      `;
    });
    playlist.innerHTML = html.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currenSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    //xử lí quay/dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, //10s
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    // xử lí phóng to thu nhỏ
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCDWidth = cdWidth - scrollTop;

      cd.style.width = newCDWidth > 0 ? newCDWidth + "px" : 0;
      cd.style.opacity = newCDWidth / cdWidth;
    };
    //xử lí khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // khi song được player
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    // khi song được pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    //xử lí tua song
    progress.onchange = function (e) {
      const seekTime = (progress.value * audio.duration) / 100;
      audio.currentTime = seekTime;
    };
    //khi next bai hat
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextsong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    //khi pre song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevsong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    //xử lí bât /tắt random song
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    //xử lí phát lại 1 bai hat
    repeaBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeaBtn.classList.toggle("active", _this.isRepeat);
    };
    //xử lí next song khi aidio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // lắng nghe hành vi click vàp playlist
    playlist.onclick = function (e) {
      if (e.target.closest(".song:not(.active)")) {
        if (!e.target.closest(".option")) {
          console.log(1);
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 500);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currenSong.name;
    cdThumb.style.backgroundImage = `url('${this.currenSong.image}')`;
    audio.src = this.currenSong.path;
  },
  nextsong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevsong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex == this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    //định nghĩa các thuộc tính
    this.defineProperties();
    // lắng nghe các sự kiện
    this.handleEvents();
    //tải thông tin bài hát
    this.loadCurrentSong();
    //render lại play list
    this.render();
  },
};
app.start();
