<template>
    <div class="banner">
        <div class="campaign-header">
            <h3>
                Data Banner
            </h3>
            <router-link to="banner/add" tag="button" class="btn btn-primary" @click.prevent="add">Tambah Banner</router-link>
        </div>
        <div class="col-md ml-2 mr-2 mt-4 p-3 datatbl">
            <h5>
                List Banner
            </h5>
            <div class="ml-2 mr-2 mt-4">
                <v-client-table :data="data" :columns="columns" :options="options">
                    <template slot="image" slot-scope="props">
                        <img :src="props.row.image" alt="" width="40" height="40">
                    </template>
                    <template slot="action" slot-scope="props">
                        <button @click.prevent="editBanner(props.row.id)"><img src="assets/images/edit@3x.png" height="16"></button>
                        <button @click.prevent="deleteBanner(props.row.id)"><img src="assets/images/delete@3x.png" height="12"></button>
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
        let result = await this.server.get("banners");
        await this.$store.dispatch('setBanner', result.data.data);

        this.data = result.data.data;
    },
    data: function() {
        return {
            data: this.$store.getters.getBanner,
            columns: [ 'image', 'title', 'sequence', 'status', 'action' ],
            options: {
                filterByColumn: false,
                perPage: 10,
                filterable: [ 'status', 'sequence' ],
                sortable: [ 'status', 'title', 'sequence' ],
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
                    image: "foto",
                    title: "judul",
                    sequence: "urutan",
                    status: "status",
                }
            }
        }
    },
    methods: {
        editBanner: function(id) {
            this.$router.push({ path: `/banner/${id}` })
        },
        deleteBanner: function(id) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "ingin menghapus banner yang dipilih??",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Urungkan'
                }).then(async (result) => {
                if (result.value) {
                    let result = await this.server.delete("delete_banner", id);
                    
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