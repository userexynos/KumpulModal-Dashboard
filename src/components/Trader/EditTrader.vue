<template>
    <div class="trader">
        <h3>
            Edit Data Pedagang
        </h3>
        <div class="col-md ml-2 mr-2 mt-4 p-3 datatbl">
            <h5 class="mb-4">
                Informasi Pedagang
            </h5>
            <div class="form-group bordered-input">
                <span>Nama Pedagang</span>
                <input v-model="data.fullname" type="text" class="form-control col-5" placeholder="Masukan nama pedagang">
            </div>
            <div class="form-group bordered-input">
                <span>Alamat Pedagang</span>
                <textarea v-model="data.address" placeholder="Alamat Pedagang" class="form-control col-8" rows="3"></textarea>
            </div>
            <div class="form-group bordered-input">
                <span>Nomor Handphone</span>
                <input v-model="data.phone_number" type="number" class="form-control col-5" placeholder="Cth. 0897654321">
            </div>
            <div class="form-group bordered-input">
                <span>Penghasilan/Hari</span>
                <input v-model="data.income_per_day" type="text" class="form-control col-5" placeholder="Cth. 300000">
            </div>
            <div class="form-group bordered-input">
                <span>Jenis Jualan</span>
                <input v-model="data.type_selling" type="text" class="form-control col-5" placeholder="Cth. Bakso">
            </div>
            <div class="form-group bordered-input">
                <div class="d-block">
                    <span class="d-block">Nomor Rekening</span>
                    <span class="d-block">(jika ada)</span>
                </div>
                <input v-model="data.rekening" type="text" class="form-control col-5" placeholder="Cth. BRI 111222333444">
            </div>
        </div>
        <div class="mt-4 btn-action">
            <button @click="cancel" class="btn btn-outline-danger mr-3">Batal</button>
            <button @click="send" class="btn btn-primary">Simpan Data Pedagang</button>
        </div>
    </div>
</template>
<script>
// import JQuery from 'jquery'
// var $ = JQuery

export default {
    created: function() {
        const id = this.$route.params.id;
        const data = this.$store.getters.getTraders.filter( function(item) {
            return item.id === id
        });
        
        if(!data.length) {
            this.$router.push({ name: "notfound" });
            return false;
        }

        this.data.fullname = data[0].fullname;
        this.data.address = data[0].address;
        this.data.phone_number = data[0].phone_number;
        this.data.income_per_day = data[0].income_per_day;
        this.data.type_selling = data[0].type_selling;
        this.data.rekening = data[0].rekening;
    },
    data() {
        return {
            data: {
                fullname: null,
                address: null,
                phone_number: null,
                income_per_day: null,
                type_selling: null,
                rekening: null,
            }
        }
    },
    methods: {
        cancel: function() {
            return this.$router.push({ path: "/pedagang" });
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
                let result = await this.server.patch("update_profile_trader", { id: this.$route.params.id, ...this.data })
                Toast.fire({ type: "success", title: result.data.message });

                this.$router.push({ path: "/pedagang" })
            } catch (err) {
                Toast.fire({ type: "error", title: err.response.data.message });
            }

        }
    }
}
</script>