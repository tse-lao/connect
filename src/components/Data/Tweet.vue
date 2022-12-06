<template>
    <main>
        <div class="user">
            @<slot name="user"></slot>
        </div>
        <div class="tweet_context">
            <div class="tweet">
                <slot name="tweet"></slot>
            </div>
            <span class="date">
                <slot name="date"></slot>
                <slot name="result"></slot>
            </span>
        </div>
    </main>
</template>
<style>
.user{
    font-weight: 400;
    color: lightskyblue;
    font-size: 1.2em;
}
.date{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

</style>