<template>
    <div class="redeem-request">
        <h3>
            Penarikan Dana
        </h3>
        <div class="col-md ml-2 mr-2 mt-4 p-3 datatbl">
            <h5>
                Permintaan Penarikan Dana
            </h5>
            <div class="ml-2 mr-2 mt-4">
                <v-client-table :data="data" :columns="columns" :options="options">
                    <template slot="image" slot-scope="props">
                        <img :src="props.row.profile_user.avatar" alt="" width="40" height="40">
                    </template>
                    <template slot="amount" slot-scope="props">
                        {{ props.row.amount | currency }}
                    </template>
                    <template slot="status" slot-scope="props">
                        <span v-if="props.row.status === 'progress'">
                            Dalam Proses
                        </span>
                        <span v-if="props.row.status === 'cancel'">
                            Penarikan Ditolak
                        </span>
                        <span v-if="props.row.status === 'done'">
                            Penarikan Sukses
                        </span>
                    </template>
                    <template slot="action" slot-scope="props">
                        <div v-if="props.row.status === 'progress'">
                            <button @click="accept(props.row.id)" class="btn btn-primary">Proses</button>
                            <button @click="decline(props.row.id)" class="btn btn-danger ml-2">Tolak</button>
                        </div>
                        <div v-if="props.row.status === 'cancel'">
                            <button class="btn btn-danger ml-2" disabled>Penarikan Ditolak</button>
                        </div>
                        <div v-if="props.row.status === 'done'">
                            <button class="btn btn-success ml-2" disabled>Selesai</button>
                        </div>
                    </template>
                </v-client-table>
            </div>
        </div>
    </div>
</template>
<script>
import JQuery from "jquery";
var $ = JQuery;
export default {
    created: async function() {
        let result = await this.server.get("users");
        await this.$store.dispatch('setInvestorData', result.data.data);
        
        setTimeout(() => this.data = this.$store.getters.getUserWithdraw, 200);
    },
    data: function() {
        return {
            data: this.$store.getters.getUserWithdraw,
            columns: [ 'id', 'createdAt', 'fullname', 'amount', 'bank_type', 'rekening', 'status', 'action' ],
            options: {
                filterByColumn: false,
                perPage: 10,
                filterable: [ 'status', 'tgl' ],
                sortable: [ 'status' ],
                texts: {
                    filter: '',
                    filterPlaceholder: 'Ketik kata kunci',
                    count: '',
                    noResults: 'Data masih kosong',
                },
                pagination: { 
                    chunk: 10,
                    dropdown: false
                },
                headings: {
                    id: "Nomor Penarikan",
                    createdAt: "Tgl penarikan",
                    fullname: "Nama pemohon",
                    amount: "Jumlah dana ditarik",
                    bank_type: "bank",
                    rekening: "Rekening",
                    status: "status"
                }
            }
        }
    },
    methods: {
        accept: function(id) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "Ingin memproses penarikan dana ini?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Urungkan'
                }).then(async (result) => {
                if (result.value) {
                    let result = await this.server.patch("update_withdraw_user", {
                        id: id,
                        status: 'done'
                    });
                    
                    this.$swal.fire(
                        'Success',
                        result.data.message,
                        'success'
                    )
                    setTimeout(() => this.$router.go(0), 2000)
                    
                }
            })
        },
        decline: function(id) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "Ingin menolak penarikan dana yang dipilih?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Urungkan'
                }).then(async (result) => {
                if (result.value) {
                    let result = await this.server.patch("update_withdraw_user", {
                        id: id,
                        status: 'cancel'
                    });
                    
                    this.$swal.fire(
                        'Success',
                        result.data.message,
                        'success'
                    )
                    setTimeout(() => this.$router.go(0), 2000)
                    
                }
            })
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            $('table').removeClass('table-bordered table-striped')
        })
    }
}
</script>
<style>
    
</style>