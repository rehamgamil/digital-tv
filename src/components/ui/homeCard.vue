<template>
  <div class="live-card ">
    <div class="d-flex live-racec">
      <b-row class="box">
        <div class="image-live">
          <div class="layer">
            <img
              src="@/assets/images/horse.jpg"
              alt=""
              img-top
              class="img-live"
            />
          </div>
          <div class="overlay"></div>
          <div class="live-content">
            <div>
              <h5 class="pt-2">Alouroba Race</h5>
            </div>
            <div class="layer-content mx-2">
              <p>Season</p>
              <div class="pb-3 icons">
                <div class="">
                  <i class="fas fa-play  icon"></i>
                  <span>watch</span>
                </div>
                <div>
                  <i class="fas fa-plus icon"></i>
                  <span>My List</span>
                </div>
                <div>
                  <i class="fas fa-share icon"></i>
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardTitle: { type: String, default: '' },
    cardDes: { type: String, default: '' },
    cardicons: { type: String, default: '' },
  },
  data() {
    return {
      images: [
        {
          id: 0,
          url: '',
        },
      ],
      icons: [
        {
          icon1: 'watch',
          icon2: 'My List',
          icon3: 'Share',
        },
      ],
    }
  },
}
</script>
<style lang="scss" >
.live-racec:hover {
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.img-live {
  width: 100%;
  height: 100%;
}

.layer-content {
  opacity: 1;
}
// .layer-content:hover {
//   opacity: 0;
// }
.layer {
  position: relative;
}

.layer::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
  transform: scaleY(1);
  transition: 0.5s;
}
.layer:hover:after {
  transform: scaleY(1);
  opacity: 0;
}

.live-content {
  padding-inline-end: 7px;
  padding-inline-start: 7px;
}

.icon {
  color: var(--co-primary);
  border-radius: 100%;
  padding: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.039) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.187) 0px -2px 6px 0px inset;
}
.icons {
  display: flex;
  justify-content: space-between;
}
</style>