<template>
  <div class="live-card">
    <div class="d-flex gap-4 pt- live-racec">
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
            <div class="layer-content">
              <p>Season</p>
              <div class="d-flex gap-3 pb-3">
                <div class="">
                  <i class="fas fa-play px-2 icon"></i>
                  <span>watch</span>
                </div>
                <div>
                  <i class="fas fa-plus px-2 icon"></i>
                  <span>My List</span>
                </div>
                <div>
                  <i class="fas fa-share px-2 icon"></i>
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
  props: { item: { type: Object } },
  data() {},
}
</script>
<style lang="scss" >

.live-racec:hover {
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-bottom-left-radius:10px ;
  border-bottom-right-radius:10px ;
}

.image-live {
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

.icon{
  color: var(--co-primary);
border: 1px solid ;
border-radius: 100%;
box-shadow: 2px  rgba(0, 0, 0, 0.8);
padding: 5px;
align-content: center;
}
</style>