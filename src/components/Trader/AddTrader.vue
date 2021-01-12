<template>
    <div class="trader">
        <h3>
            Tambah Data Pedagang
        </h3>
        <div class="col-md ml-2 mr-2 mt-4 p-3 datatbl">
            <h5>
                Upload foto pedagang
            </h5>
            <div class="row justify-content-center">
                <div class="form-image">
                    <label for="upload-image">
                        <img src="/assets/images/foto_1.png" id="img" height="200">
                    </label>
                    <input accept="image/*" type="file" id="upload-image" @change="changePicture($event)">
                    <span class="d-block text-center">+ Pilih Foto Pedagang</span>
                </div>
            </div>
        </div>
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
import JQuery from 'jquery'
var $ = JQuery

export default {
    data() {
        return {
            data: {
                fullname: null,
                address: null,
                phone_number: null,
                income_per_day: null,
                type_selling: null,
                rekening: null,
                image: null
            }
        }
    },
    methods: {
        changePicture: function(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.previewPicture(e.target.files[0]);
        },
        previewPicture: function(image) {
            this.image = image;
            let data = null;
            var reader = new FileReader();
            reader.onload = function (e) {
                data = e.target.result;
            }
            reader.readAsDataURL(image);
            setTimeout(() => {
                $('#img').attr('src', data);
                this.data.image = data.replace(/^data:image.+;base64,/, '');
            }, 500)
        },
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
                let result = await this.server.post("create_profile_trader", this.data);
                Toast.fire({ 
                    type: "success", title: result.data.message
                });

                this.$router.push({ path: "/pedagang" });
            } catch (err) {
                Toast.fire({ 
                    type: "error", title: err.response.data.message
                });
            }

        }
    }
}
</script>
<style>
.trader {
    padding-bottom: 80px;
}

.form-image>input {
    display: none;
}
.bordered-input {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
}

.bordered-input span {
    width: 200px;
    color: rgba(0,0,0,0.6);
}

.bordered-input input[type=text],input[type=number] {
    position: relative;
}

.bordered-input textarea {
    position: relative;
}

.bordered-input div {
    display: flex;
    align-items: center;
}

.bordered-input div input {
    margin-left: 90px;
}

.btn-action {
    display: flex;
    position: absolute;
    right: 25px;
}

input[type=number] {
    -moz-appearance:textfield;
}
</style>