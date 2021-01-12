<template>
    <div class="trader">
        <h3>
            Edit Data Investor
        </h3>
        <div class="col-md ml-2 mr-2 mt-4 p-3 datatbl">
            <h5 class="mb-4">
                Informasi Pedagang
            </h5>
            <div class="form-group bordered-input">
                <span>Nilai Asset</span>
                <input v-model="data.asset_value" type="text" class="form-control col-5" placeholder="Cth. 2000000">
            </div>
            <div class="form-group bordered-input">
                <span>Net Gain Return</span>
                <input v-model="data.net_gain_return" type="number" class="form-control col-5" placeholder="Cth. 1900000">
            </div>
            <div class="form-group bordered-input">
                <span>Dana Tersedia</span>
                <input v-model="data.funds_available" type="number" class="form-control col-5" placeholder="Cth. 200000">
            </div>
        </div>
        <div class="mt-4 btn-action">
            <button @click="cancel" class="btn btn-outline-danger mr-3">Batal</button>
            <button @click="send" class="btn btn-primary">Simpan Data Investor</button>
        </div>
    </div>
</template>
<script>
// import JQuery from 'jquery'
// var $ = JQuery

export default {
    
    created: function() {
        const id = this.$route.params.id;
        const data = this.$store.getters.getInvestor.filter( function(item) {
            return item.id === id
        });
        
        if(!data.length) {
            this.$router.push({ name: "notfound" });
            return false;
        }
        
        this.data.net_gain_return = data[0].trader_user.net_gain_return === 0 ? "" : data[0].trader_user.net_gain_return;
        this.data.asset_value = data[0].portofolio_user.asset_value === 0 ? "" : data[0].portofolio_user.asset_value;
        this.data.funds_available = data[0].portofolio_user.funds_available.length === 0 ? "" : data[0].portofolio_user.funds_available;
    },
    
    data() {
        return {
            data: {
                net_gain_return: null,
                asset_value: null,
                funds_available: null
            }
        }
    },
    
    methods: {
        
        cancel: function() {
            return this.$router.push({ path: "/investor" });
        },
        
        send: async function() {
            const Toast = this.$swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            });
            
            try {
                const result = await this.server.patch("update_user", { id: this.$route.params.id, ...this.data })
                Toast.fire({ type: "success", title: result.data.message });
                
                this.$router.push({ path: "/investor" })
            } catch (err) {
                Toast.fire({ type: "error", title: err.response.data.message });
            }
        }
    }
}
</script>