<template>
    <div class="loading">
        <h3 class="loading-text">Loading....</h3>
    </div>
</template>

<style scoped>
.loading{
    margin: 0 auto;
    display: flex;
    margin-top: 10rem;
    justify-content: center;
}

.loading-text{
    background: linear-gradient(90deg, #92e2a7 ,#6366f1,  #92e2a7 );
    letter-spacing: 5px;
    background-size: 400px;
    font-weight: 600;
    font-size: 32px;
    text-transform: uppercase;
    animation: animate 10s linear infinite;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    
    opacity: 1;
    
    -webkit-transition: opacity 0.5s ease-in-out;
    -moz-transition: opacity 1s ease-in-out;
    transition: opacity 1s ease-in-out;
    
    
    
}
@keyframes animate{
    0%{
        background-position: 0%;
    }
    100%{
        background-position: 400%;
    }
}
</style>