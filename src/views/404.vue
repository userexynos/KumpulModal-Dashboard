<template>
    <div class="text-center" style="height: 100vh;display: flex; align-items: center; justify-content: center">
        <div>
            <div>
                <h1 style="display: block">Oops... Something Wrong</h1>
            </div>
            <div>
                <h5 style="font-family: SSP-Regular">
                    Sorry, we cannot find your requested page...
                    <router-link class="text-dark" to="/" tag="a">
                        Please Click Here
                    </router-link>
                </h5>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
