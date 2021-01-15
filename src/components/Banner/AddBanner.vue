<template>
    <div class="banner">
        <h3>
            Tambah Banner
        </h3>
        <div class="col-md ml-2 mr-2 mt-4 p-3 datatbl">
            <h5>
                Upload Banner
            </h5>
            <div class="row justify-content-center">
                <div class="form-image">
                    <label for="banner-upload">
                        <img src="/km-dash/assets/images/foto_1.png" id="banner-preview" height="200">
                    </label>
                    <input accept="image/*" ref="file" type="file" id="banner-upload" @change="bannerUpload($event)">
                    <label for="banner-upload" class="d-block text-center">+ Pilih Banner</label>
                </div>
            </div>
        </div>
        <div class="col-md ml-2 mr-2 mt-4 p-3 datatbl">
            <h5 class="mb-4">
                Informasi Banner
            </h5>
            <div class="form-group bordered-input">
                <span>Judul Banner</span>
                <input v-model="data.title" type="text" class="judul form-control col-5" placeholder="Masukan Judul Campaign">
            </div>
            <div class="form-group bordered-input">
                <span>Urutan</span>
                <select v-model="data.sequence" class="custom-select select-input" id="inputGroupSelect01">
                    <option disabled>Pilih</option>
                    <option v-for="i in 3" :key="i" :value="i">{{ i }}</option>
                </select>
            </div>
            <div class="bordered-input">
                <span>Status Banner</span>
                <div class="custom-input custom-switch">
                    <input v-model="data.status" type="checkbox" class="custom-control-input" id="customSwitch1">
                    <label class="custom-control-label" for="customSwitch1">{{ data.status ? "Aktif" : "Tidak Aktif" }}</label>
                </div>
            </div>
        </div>
        <div class="mt-4 btn-action">
            <button @click="cancel()" class="btn btn-outline-danger mr-3">Batal</button>
            <button @click="send()" class="btn btn-primary">Simpan Banner</button>
        </div>
    </div>
</template>
<script>
import JQuery from 'jquery';
var $ = JQuery;
export default {
    data: function() {
        return {
            data: {
                title: null,
                sequence: 1,
                status: $('#customSwitch1').is(":checked"),
                image: null
            }
        }
    },
    
    methods: {
        bannerUpload: function(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            var data = null;
            var reader = new FileReader();
            reader.onload = function (e) {
                data = e.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
            setTimeout(() => {
                this.data.image = data.replace(/^data:image.+;base64,/, '');
                $(`#banner-preview`).attr('src', data);
            }, 500)
        },
        
        cancel: function() {
            return this.$router.push({ path: "/banner" });
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
                let result = await this.server.post("create_banner", {
                    ...this.data,
                    status: this.data.status ? 'active' : 'nonactive'
                });
                Toast.fire({ type: "success", title: result.data.message });

                this.$router.push({ path: "/banner" })
            } catch(err) {
                Toast.fire({ type: "error", title: err.response.data.message });
            }
        }
    }
}
</script>

<style>
a {
    cursor: pointer;
}
.campaign {
    padding-bottom: 80px;
}

.form-image #update {
    display: unset;
    border-bottom: none;
    margin-left: -5px;
    margin-bottom: 10px;
}
.bordered-input1 {
    display: flex;
    width: 100%;
}
.bordered-input1 span {
    width: 200px;
    color: rgba(0,0,0,0.5)
}
.vdp-datepicker.start div input:read-only {
    width: 110px;
    background: white;
}
.vdp-datepicker.start div input::placeholder {
    color: rgba(0,0,0,0.3)
}
.vdp-datepicker.end div input:read-only {
    width: 110px;
    background: white;
}
.vdp-datepicker.end div input::placeholder {
    color: rgba(0,0,0,0.3)
}
.vdp-datepicker.update div input:read-only {
    width: 170px;
    background: white;
}
.vdp-datepicker.update div input::placeholder {
    color: rgba(0,0,0,0.3)
}
.select-input {
    width: 100px
}
.bordered-input .select-input{
    position: relative;
}
</style>
