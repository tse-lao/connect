<script lang="ts">


export default {
  name:"Landing", 
  methods:{
    goToApp(){
        console.log(window.location.host);

        window.location.replace('http://app.'+ window.location.host)

    }, 
    goLightMode(){
      document.body.style.backgroundColor = "white";

    }
  },
  mounted(){
    this.goLightMode();
  }
};
</script>

<template color-scheme="light">
    <div class="homepage">
        <div class="top_header">
          <div class="logo">
            <img src="@/assets/images/cf_logo_Logo.png" alt="logo" />
            <span> Connect Fast </span>
          </div>

          <div class="top_right">
            
          
                <button @click="goToApp">
                  Open App
                </button>

          </div>
        </div>
        <div class="content">
          <RouterView />

        </div>

        
      <div class="footer-body">
          <div class="links">

              <a href="https://t.me/+Lx-kwEmObs43Njc0">Contact</a>
              <a href="">Privacy Policy</a>
              <a href="https://github.com/tse-lao/connect" target="_blank">Open Source</a>
              <a href="">Terms of Conditions</a>
          </div>
          <div class="socials">
            <div class="image">
              <img src="@/assets/images/cf_logo_Logo.png" />
            </div>
            <div class="links">
              <a href="https://t.me/+Lx-kwEmObs43Njc0">
                <img src="@/assets/icons/brand/telegram.svg" />
              </a>
              <a href="https://twitter.com/ConnectFastv1">
                <img src="@/assets/icons/brand/twitter.svg" />
              </a>
              <a href="https://discord.gg/ShRxCuZQ">
                <img src="@/assets/icons/brand/discord.svg" />
              </a>
              
            </div>
            <div class="copyright">
              2021 - 2023, All Rights Reserved
            </div>
          </div>
      </div>
      </div>
</template>
<style scoped> 
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

html {
  font-family: Poppins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.homepage{
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: auto;
  align-content: center;
}

/* TOP HEADER */
.top_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.top_header .top_right button {
  /* Primary/Secondary */
  background: #41e5aa;
  box-shadow: 0px 15px 40px rgba(65, 229, 170, 0.1);
  border-radius: 8px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  z-index: 100000;
  right: 24px;
  top: 24px;
  position: fixed;

}

.logo {
  display: flex;
  align-items: center;
  align-content: center;
  margin: 32px;
  gap: 2rem;
}
.logo img {
  max-width: 48px;
  max-height: 48px;
}

.logo span {
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.2em;
  font-size: 24px;
  text-transform: uppercase;
  color: #142647;
}
/* END OF TOP HEADER*/
.content{
  padding: 3rem;
}
/* ------- HERO SECTIONS ____ */
.hero1 {
  /* bg */
  /* Bg */

  position: absolute;
  width: 50vw;
  height: 780.83px;
  top: 0;
  right: 0;
  border-radius: 30% 70% 65% 35% / 30% 30% 70% 70%;
  z-index: -2000;

  background: linear-gradient(
    199.02deg,
    #ece0ff -1.37%,
    #f6f9ff -1.36%,
    #ffffff 86.93%
  );
  transform: matrix(-1, 0, 0, 1, 0, 0);
}
.hero2 {
  /* Bg */

  position: absolute;
  width: 845.01px;
  height: 846px;
  right: 0;
  top: -8px;
  z-index: -1;
  border-radius: 30% 70% 65% 35% / 30% 30% 70% 70%;
  background: linear-gradient(
    228.26deg,
    rgba(236, 224, 255, 0.3) 6.98%,
    rgba(240, 245, 255, 0.3) 109.11%
  );
  opacity: 0.8;
  transform: matrix(-1, 0, 0, 1, 0, 0);
}
.hero_section {
  display: flex;
  gap: 48px;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  align-content: center;
  align-items: center;
  margin: 10% 10%;
}
.text_section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 24px;
}

.image_section {
  flex: 1;
}
.image_section img {
  max-width: 400px;
}



/* END HERO SECTION*/

span {
  /* Data collection from different social platforms. FB, instagram, youtube, google, strava etc etc */
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  /* or 175% */
  display: flex;
  align-items: center;

  /* body */
  color: #828282;
}

h1 {
  font-family: "Poppins";
  font-size: 32px;
  font-weight: 500;
}

h4 {
  font-size: 20px;
  font-weight: 500px;
  font-family: "Poppins";
  font-weight: 500;
}

.sections {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
h5 {
  margin-block-start: 0;
  margin-block-end: 0;
}
.text_section h1 {
  font-size: 32px;
  color: #151d48;
  font-weight: 600;
}
button {
  cursor: pointer;
  /* base/Semibold */
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  border: none;
  padding: 12px 32px !important;

  /* Primary/900 */
  color: #142647;

  /* Primary/Secondary */
  background: #41e5aa !important;
  border-radius: 8px;
}


.two-section {
  display: flex;
  padding: 5% 10%;
  gap: 24px;
  flex-direction: row;
  text-align: left;
  flex-wrap: wrap;
  align-items: center;
}
.two-section h4 {
  font-size: 20px;
  font-weight: 500px;
  color: rgba(65, 229, 170, 0.6)
}

.two-section img {
  max-width: 400px;
}

span {
  font-size: 14px;
  color: #abadbb;
}

.left {
  flex-direction: row-reverse;
  background: #f7fafd;
}



/* ABOUT USSS
 */
.two_sections {
  display: flex;
  flex-direction: row;
  margin: 5% 15%;
  gap: 32px;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
}
.image_section {
  flex: 1;
}
.image_section img {
  max-width: 450px;
}

.text_section {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.text_section h5 {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #50f7bb;
}
.text_section
h3 {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 47px;
  text-align: left;
  color: #151d48;
  margin-block-start: 0;
}
.text_section
span {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  text-align: left;
  /* or 162% */

  color: #828282;
}

.btn-section {
  display: flex;
  gap: 32px;
  margin-top: 24px;
}
.btn-section .inverse {
  background: none;
}


.footer-body {
  background: #142647;
  color: rgba(240, 245, 255, 0.3);
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: Poppins;
  font-weight: 400;
  min-width: 96vw;

  /* Shape */
}
.footer-body .socials{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
}

.socials img{
  height: 32px;
  width: 32px;
  filter: invert(1);
}
.links{
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  color:white;
}
.links a{
  color: white;
}




    /*CHANGE MEDIA QUERIES FOR CERTAIN SIZES */
    @media (max-width: 426px) {
  
      body{
        margin: 0px;
      }
      
      img{
        max-width: 80vw;
      }
  /* … */
  .logo span{
    font-size: 12px;
    letter-spacing: 0px;
  }
  .text-section{
    gap: 0px;
  }
  
  
  
}
</style>