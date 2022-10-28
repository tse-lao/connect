<script lang="ts">
export default {};
</script>

<template>
  <div class="">
    <div class="homepage">
      <div class="homepage">
        <div class="top_header">
          <div class="logo">
            <img src="@/assets/images/cf_logo_Logo.png" alt="logo" />
            <span> Connect Fast </span>
          </div>

          <div class="top_right">
            
              <a href='http://app.localhost:5173'>
                <button>
                  Open App
                </button></a>

          </div>
        </div>

        <div class="hero_section">
          <div class="text_section">
            <h1>Be part of the new generation</h1>
            <span>
              We provide everyone the solution for integrating web3 solutions to
              their own data collection. Please provide your information here to
              be shared.
            </span>
            <div class="div">
              <button>Explore CF</button>
            </div>
          </div>
          <div class="image_section">
            <img
              src="@/assets/images/main_illustration.svg"
              alt="main_illustartion"
            />
          </div>
        </div>
        
        <div class="hero1"></div>
        <div class="hero2"></div>
      </div>
      <div class="two_sections">
        <div class="image_section">
          <img src="@/assets/images/chessboard.svg" alt="chessboard_file" />
        </div>
        <div class="text_section">
          <h5>What does Connect Fast</h5>
          <h3>Help to take control of your personal data.</h3>
          <span>
            Currently all websites and applications are collecting data you
            generate. From clicks on certain areas in teh application. To last
            visited pages and visited pages in the future. This data will be
            stored, analyzed and distributed to third parties, all without the
            exact knowledge of the generator, the user. This is against most
            countries law, but still very difficult to track. With Connect Fast
            we find a solution to this problem.
          </span>

          <div class="btn-section">
            <button>More info</button>
            <button class="inverse">Download now</button>
          </div>
        </div>
      </div>
      <div>
        <div class="two-section">
          <div class="left-two-section">
            <img src="@/assets/images/world_connect.svg" alt="alternative" />
          </div>
          <div class="right-two-section">
            <h4>Regain back insight in the collection of data.</h4>
            <span>
              Currently all websites and applications are collecting data you
              generate. From clicks on certain areas in teh application. To last
              visited pages and visited pages in the future. This data will be
              stored, analyzed and distributed to third parties, all without the
              exact knowledge of the generator, the user. This is against most
              countries law, but still very difficult to track. With Connect
              Fast we find a solution to this problem.
            </span>
          </div>
        </div>
        <div class="two-section left">
          <div class="left-two-section">
            <img src="@/assets/images/choicing_data.svg" alt="alternative" />
          </div>
          <div class="right-two-section">
            <h4>Encrypt and collect your data Shared by the insights.</h4>
            <span>
              We, Connect Fast, provide our users with the options to get back
              the data you generated from all different platforms.
            </span>
          </div>
        </div>
        <div class="two-section">
          <div class="left-two-section">
            <img
              src="@/assets/images/dashboard_connection.svg"
              alt="alternative"
            />
          </div>
          <div class="right-two-section">
            <h4>Decide who you want to Share the data with.</h4>
            <span>
              With our smart mechansim you can decide who, when and what data
              you want to share. This data can be shared based upon a fee or
              agreement. There is always a case where the value of the
              distributed data can be shared with third parties, this is only
              the case when it is decide by the owner of the data in the smart
              contract.
            </span>
          </div>
        </div>
        <div class="two-section left">
          <div class="left-two-section">
            <img src="@/assets/images/selecting_data.svg" alt="alternative" />
          </div>
          <div class="right-two-section">
            <h4>Sell your data on the market.``</h4>
            <span>
              We have built an internal market where we decide which data we
              want to share with whom.
            </span>
          </div>
        </div>
      </div>
   
       
      <div class="footer-body">
        <div class="white-bow">
          <img src="{logo}" alt="connect_logo" />
          <h1>Connect Fast</h1>
        </div>
        <div class="footer_menu">
          <div class="left-links">
            <span>About us </span>
            <span>Download</span>
            <span>Whitepaper </span>
            <span>Contact </span>
          </div>
          <div class="right_menu">
            <img src="@/assets/icons/landing/discord.svg" alt="discord_icon" />
            <img src="@/assets/icons/landing/telegram.svg" alt="telegram_icon" />
            <img src="@/assets/icons/landing/social-twitter.svg" alt="twitter_icon" />
          </div>
        </div>

        <hr />
        <div class="footer_submenu">
          <div class="left_links">
            <div>Terms and conditions </div>
            <div>Privacy Conditions</div>
          </div>
          <div class="left-links">
            Copyright Connect Fast. Created by BarcaGlobalServices.
          </div>
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
b


.homepage{
  max-width: 1400px;
  margin: auto;
  align-content: center;
}
/* transitions! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

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
  padding: 5% 20%;
  gap: 24px;
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

.top_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}
.top_header .top_right {
  margin-right: 64px;
  top: 0px;
  right: 10px;
}
.top_header .top_right button {
  /* Primary/Secondary */
  background: #41e5aa;
  /* Green */
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
  gap: 32px;
}
.logo img {
  max-width: 64px;
  max-height: 64px;
}

.logo span {
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 24px;
  /* or 75% */

  color: #142647;
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
  width: 100vw;
  margin-bottom: 0;
  /* Shape */
}
  /* Greys/Blue Grey/200 */
 .footer-body hr {
    width: calc(100vw - 300px);
    border: none;
    background-color: white;
    height: 0.5px;
  }

  .white-bow {
    width: 100vw;
    background: #fcfdff;
    border-radius: 0 0 100% 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 24px;
  }
    .white-bow img {
      max-width: 150px;
      max-height: 72px;
    }

   .white-bow h1 {
      font-family: "Poppins";
      font-style: semibold;
      font-weight: 600;
      font-size: 48px;

      line-height: 24px;
      /* or 38% */

      color: #142647;
    }


  .footer_menu {
    margin: 35px;
    display: flex;
    justify-content: space-between;
  }
   .footer_menu .left-links {
      color: white;
      font-size: 14px;
      display: flex;
      gap: 32px;
      flex: 1;
    }

   .footer_menu .right_menu {
      display: flex;
      gap: 32px;
      flex: 1;
      flex-direction: row-reverse;
   }
  .right_menu   img {
        max-width: 24px;
        filter: invert(100%);
        -webkit-filter: invert(1);
        -moz-filter: invert(100%);
        -o-filter: invert(100%);
        -ms-filter: invert(100%);
        opacity: 0.9;
      }
      
    .right-menu img:hover{
        filter: invert(50%);
        opacity: 0.1;
}


  .footer_submenu {
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    color: white;
    padding: 12px 36px;
    gap: 24px;
    flex-wrap: wrap;
  }
.footer_submenu  left_links {
      gap: 24px;
      display: flex;
      flex-direction: column;
    }

</style>