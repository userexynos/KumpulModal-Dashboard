<template>
    <div class="trader">
        <div class="trader-header">
            <h3>
                Data Pedagang
            </h3>
            <router-link to="/pedagang/add" class="btn btn-primary">Tambah Data Pedagang</router-link>
        </div>
        <div class="col-md ml-2 mr-2 mt-4 p-3 datatbl">
            <h5>
                Detail Pedagang
            </h5>
            <div class="ml-2 mr-2 mt-4">
                <v-client-table :data="data" :columns="columns" :options="options">
                    <template slot="image" slot-scope="props">
                        <img :src="props.row.image" alt="" width="40" height="40">
                    </template>
                    <template slot="income_per_day" slot-scope="props">
                        {{ props.row.income_per_day | currency }}
                    </template>
                    <template slot="action" slot-scope="props">
                        <button @click.prevent="editPedagang(props.row.id)"><img src="assets/images/edit@3x.png" height="16"></button>
                        <button @click.prevent="deletePedagang(props.row.id)"><img src="assets/images/delete@3x.png" height="12"></button>
                    </template>
                </v-client-table>
            </div>
        </div>
    </div>
</template>
<script>
import JQuery from "jquery"
var $ = JQuery
export default {
    created: async function() {
        let result = await this.server.get("profile_trader");
        await this.$store.dispatch('setTradersData', result.data.data);

        this.data = result.data.data;  
    },
    data: function() {
        return {
            data: this.$store.getters.getTraders,
            columns: [ 'image', 'fullname', 'address', 'phone_number', 'income_per_day', 'type_selling', 'rekening', 'action' ],
            options: {
                filterByColumn: false,
                perPage: 10,
                filterable: [ 'fullname', 'phone_number' ],
                sortable: [ 'fullname' ],
                texts: {
                    filter: '',
                    filterPlaceholder: 'Ketik kata kunci',
                    count: '',
                    noResults: 'Data masih kosong'
                },
                visibleColumns: false,
                pagination: { 
                    chunk: 10,
                    dropdown: false
                },
                headings: {
                    image: "Foto",
                    fullname: "Nama",
                    address: "Alamat",
                    income_per_day: "Pendapatan/Hari",
                    phone_number: "Handphone"
                }
            }
        }
    },
    methods: {
        editPedagang: function(id) {
            this.$router.push({ path: `/pedagang/${id}` })
        },        
        deletePedagang: function(id) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "ingin menghapus pedagang yang dipilih??",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Urungkan'
                }).then(async (result) => {
                if (result.value) {
                    let result = await this.server.delete("delete_profile_trader", id);
                    
                    this.$swal.fire(
                        'Deleted!',
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