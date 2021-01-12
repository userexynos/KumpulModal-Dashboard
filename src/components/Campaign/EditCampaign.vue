<template>
    <div class="campaign">
        <h3>
            Edit Data Campaign
        </h3>
        <div class="col-md ml-2 mr-2 mt-4 p-3 datatbl">
            <h5 class="mb-4">
                Informasi Campaign
            </h5>
            <div class="form-group bordered-input">
                <span>Judul Campaign</span>
                <input v-model="data.title" type="text" class="judul form-control col-5" placeholder="Masukan Judul Campaign">
            </div>
            <!-- <div class="form-group bordered-input1">
                <span>Lama Campaign</span>
                <Datepicker :placeholder="moment(new Date).format('DD MMM YYYY')" class="start" v-model="data.date_one" :bootstrap-styling="true"></Datepicker>
                <div style="display: flex; align-items: center; font-size: 12px; margin-left: 5px; margin-right: 5px; color: rgba(0,0,0,0.6)">
                    sampai
                </div>
                <Datepicker :placeholder="moment(new Date).format('DD MMM YYYY')" class="end" v-model="data.date_two" :bootstrap-styling="true"></Datepicker>
            </div> -->
            <div class="form-group bordered-input">
                <span>Target Campaign</span>
                <input v-model="data.collected_target" type="number" class="form-control col-5"  placeholder="Cth. 2500000">
            </div>
            <div class="form-group bordered-input">
                <span>Harga/Slot</span>
                <input v-model="data.price_per_slot" type="number" class="form-control col-5" placeholder="Cth. 100000">
            </div>
            <div class="form-group bordered-input">
                <span>Cerita Pedagang</span>
                <textarea v-model="data.story" placeholder="Cerita keadaan pedagang untuk menarik simpatik investor" class="form-control col-8" rows="3"></textarea>
            </div>
            <div class="form-group bordered-input">
                <span>Estimasi Return</span>
                <input type="number" v-model="data.return_poi" class="form-control" style="width: 60px" placeholder="0">
                <span style="display: flex; align-items: center; margin-left: 5px;">%</span>
            </div>
            <div class="form-group bordered-input">
                <span>Lama Kontrak/Bulan</span>
                <select v-model="data.contract" class="custom-select select-input" id="inputGroupSelect01">
                    <option disabled>Pilih</option>
                    <option v-for="index in 24" :key="index" :value="index">{{ index }} Bulan</option>
                </select>
            </div>
            <div class="bordered-input1">
                <span>Update</span>
                <div>
                    <div v-for="i in data.updates.length" :key="i">
                        <div class="form-image">
                            <input accept="image/*" id="update" ref="file" type="file" @change="updateUpload(i-1, $event)">
                        </div>
                        <div>
                            <input v-model="data.updates[i-1].title" type="text" class="judul form-control col-5" placeholder="Masukan Judul Update">
                        </div>
                        <div class="pt-3" style="width: 700px">
                            <textarea placeholder="Cerita keadaan pedagang untuk menarik simpatik investor" v-model="data.updates[i-1].description" class="form-control col-12" rows="3"></textarea>
                        </div>
                    </div>
                    <a v-if="data.updates.length === 0" @click="addUpdate">
                        + Tambah Update Baru
                    </a>
                    <a v-else @click="deleteUpdate">
                        - Urungkan Update Baru
                    </a>
                </div>
            </div>
            <div class="form-group bordered-input1 mt-2">
                <span>Return Breakdown</span>
                <div>
                    <div v-for="index in return_breakdown_month.length" :key="index" class="bordered-input">
                        <input v-model="return_breakdown_month[index-1]" type="text" class="form-control mr-2" style="width: 100px" placeholder="Bulan 1" disabled>
                        <input v-model="return_breakdown_profit[index-1]" type="number" class="form-control mr-2" placeholder="Bagi hasil ke 1 contoh 25000">
                        <select v-model="return_breakdown_poi[index-1]" class="custom-select select-input" id="inputGroupSelect01">
                            <option disabled>Pilih</option>
                            <option v-for="index in 12" :key="index" :value="index+'%'">{{ index }}%</option>
                        </select>
                        <div v-if="return_breakdown_month.length > 1">
                            <div class="ml-3" v-if="index === return_breakdown_month.length">
                                <a @click="onDelete()">Hapus</a>
                            </div>
                        </div>
                    </div>
                    <a @click="addMonth">
                        + Tambah Bulan
                    </a>
                </div>
            </div>
            <div class="form-group bordered-input">
                <span>Pengambilan Modal</span>
                <input v-model="data.return_share" type="number" class="form-control col-5" placeholder="Cth. 200000">
            </div>
            <div class="form-group bordered-input">
                <span>Total (Modal+Return)</span>
                <input v-model="total" type="number" class="form-control col-5" placeholder="0" disabled>
            </div>
            <div class="form-group bordered-input">
                <span>Total Slot</span>
                <input v-model="remaining_slots" type="number" class="form-control col-1" placeholder="0" disabled>
            </div>
            <div class="bordered-input">
                <span>Status Campaign</span>
                <div class="custom-input custom-switch">
                    <input v-model="data.status" type="checkbox" class="custom-control-input" id="customSwitch1">
                    <label class="custom-control-label" for="customSwitch1">{{ data.status ? "Aktif" : "Tidak Aktif" }}</label>
                </div>
            </div>
        </div>
        <div class="mt-4 btn-action">
            <button @click="cancel()" class="btn btn-outline-danger mr-3">Batal</button>
            <button @click="send()" class="btn btn-primary">Simpan Data Campaign</button>
        </div>
    </div>
</template>
<script>
import JQuery from 'jquery';
var $ = JQuery;

export default {
    created: function() {
        const id = this.$route.params.id;
        const data = this.$store.getters.getCampaign.filter( function(item) {
            return item.id === id
        });
        
        if(!data.length) {
            this.$router.push({ name: "notfound" });
            return false;
        }
        
        for(let i = data[0].table_trader.length-1; i > 1; i--) {
            this.return_breakdown_month.push(data[0].table_trader[i].return_breakdown_month)
            this.return_breakdown_profit.push(data[0].table_trader[i].return_breakdown_profit.split('.').join(''))
            this.return_breakdown_poi.push(data[0].table_trader[i].return_breakdown_poi)
        }
        this.data.title = data[0].title;
        this.data.collected_target = data[0].collected_target;
        this.data.price_per_slot = data[0].detail_trader.price_per_slot;
        this.data.story = data[0].detail_trader.story;
        this.data.return_poi = data[0].detail_trader.return;
        this.data.contract = data[0].detail_trader.contract;
        this.data.return_share = data[0].table_trader[1].return_breakdown_profit.split('.').join('');
        this.data.status = data[0].status === "progress" ? true : false
    },
    
    data: function() {
        return {
            data: {
                title: null,
                collected_target: null,
                price_per_slot: null,
                story: null,
                image: null,
                return_poi: null,
                contract: 1,
                return_share: null,
                status: $('#customSwitch1').is(":checked"),
                updates: []
            },
            return_breakdown_month: [],
            return_breakdown_profit: [],
            return_breakdown_poi: [],
        }
    },
    
    computed: {
        profit: function() {
            let data = [];
            this.return_breakdown_profit.map((item) => {
                data.push(this.separator(item))
            })
            return data;
        },
        
        remaining_slots: function() {
            return parseInt(this.data.collected_target)/parseInt(this.data.price_per_slot);
        },
        
        total: function() {
            let profit = this.return_breakdown_profit.reduce(function(a, b) {
                let data_a = a == "" ? 0 : parseInt(a);
                let data_b = b == "" ? 0 : parseInt(b);
                
                return data_a + data_b;
            });
            
            return parseInt(profit)+parseInt(this.data.return_share)
        }
    },
    
    methods: {
        
        updateUpload(key, e) {
            var files = e.target.files || e.dataTransfer.files;
            
            if (!files.length) return;
            var data = null;
            var reader = new FileReader();
            reader.onload = function (e) {
                data = e.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
            setTimeout(() => {
                this.data.updates[key].image = data.replace(/^data:image.+;base64,/, '');
            }, 500);
        },
        
        addUpdate() {
            return this.data.updates.push({
                image: null,
                title: null,
                description: null
            })
        },
        
        deleteUpdate: function() {
            this.data.updates = [];
        },
        
        addMonth: function() {
            this.return_breakdown_month = [...this.return_breakdown_month, (parseInt(this.return_breakdown_month[this.return_breakdown_month.length-1]) + 1).toString()];
            this.return_breakdown_poi = [...this.return_breakdown_poi, "1%"];
            this.return_breakdown_profit = [...this.return_breakdown_profit, ""];
        },
        
        onDelete: function() {
            let return_breakdown_month = [];
            let return_breakdown_poi = [];
            let return_breakdown_profit = [];
            for(let i = 0; i < this.return_breakdown_month.length-1; i++) {
                return_breakdown_month.push(this.return_breakdown_month[i]);
                return_breakdown_poi.push(this.return_breakdown_poi[i]);
                return_breakdown_profit.push(this.return_breakdown_profit[i]);
            }
            this.return_breakdown_month = [...return_breakdown_month];
            this.return_breakdown_profit = [...return_breakdown_profit];
            this.return_breakdown_poi = [...return_breakdown_poi];
        },
        
        
        cancel: function() {
            return this.$router.push({ path: "/campaign" });
        },
        
        send: async function() {
            const Toast = this.$swal.mixin(
                {
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: function(toast) {
                        toast.addEventListener('mouseenter', this.$swal.stopTimer)
                        toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                    }
                }
            );
            try {
                if(parseInt(this.data.return_poi) > 12) {
                    Toast.fire(
                        { 
                            type: "error",
                            title: "Field Return must be shorten 12" 
                        }
                    );
                } else if(/^[-]/g.test(this.data.return_poi)) {
                    Toast.fire(
                        { 
                            type: "error", 
                            title: "Field Return cannot be minus" 
                        }
                    );
                } else if(parseInt(this.data.return_share) === 0 || this.data.return_share === null) {
                    Toast.fire(
                        { 
                            type: "error", 
                            title: "Field Pengambilan Modal cannot be empty" 
                        }
                    );
                } else {
                    if(this.data.updates.length > 0) {
                        if(this.data.updates[0].title === null || this.data.updates[0].title === "") {
                            Toast.fire(
                                { 
                                    type: "error", 
                                    title: "Title Update is Required"
                                }
                            );
                            return false;
                        } else if(this.data.updates[0].description === null || this.data.updates[0].description === "") {
                            Toast.fire(
                                { 
                                    type: "error", 
                                    title: "Description Update is Required"
                                }
                            );
                            return false;
                        } else if(this.data.updates[0].image === null || this.data.updates[0].image === "") {
                            Toast.fire(
                                { 
                                    type: "error", 
                                    title: "Image Update is Required"
                                }
                            );
                            return false;
                        } else {
                            await this.server.post("create_timeline_trader", 
                                {
                                    id: this.$route.params.id,
                                    title: this.data.updates[0].title,
                                    icon: this.data.updates[0].image,
                                    description: this.data.updates[0].description
                                }
                            );
                        }
                    }
                    let result = await this.server.patch("update_data_trader", 
                        {
                            ...this.data,
                            id: this.$route.params.id,  
                            return_breakdown_month: [...this.return_breakdown_month, "Pengembalian Modal", "Total"],
                            return_breakdown_profit: [...this.profit, this.separator(this.data.return_share), this.separator(this.total.toString())],
                            return_breakdown_poi: [...this.return_breakdown_poi],
                            remaining_slots: parseInt(this.remaining_slots),
                            status: this.data.status ? "progress" : "nonactive"
                        }
                    );
                    Toast.fire(
                        { 
                            type: "success", 
                            title: result.data.message 
                        }
                    );
                    
                    this.$router.push({ path: "/campaign" })
                }
            } catch(err) {
                Toast.fire(
                    { 
                        type: "error", 
                        title: err.response.data.message 
                    }
                );
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
