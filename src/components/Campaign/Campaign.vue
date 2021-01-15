<template>
    <div class="campaign">
        <div class="campaign-header">
            <h3>
                Campaign
            </h3>
            <router-link to="campaign/add" tag="button" class="btn btn-primary" @click.prevent="add">Tambah Campaign</router-link>
        </div>
        <div class="col-12 ml-2 mr-2 mt-4 p-3 datatbl">
            <h5>
                Detail Campaign
            </h5>
            <div class="ml-2 mr-2 mt-4">
                <v-client-table :data="rowData" :columns="columns" :options="options">
                    <template slot="image" slot-scope="props">
                        <img :src="props.row.image" alt="" width="40" height="40">
                    </template>
                    <template slot="collected_target" slot-scope="props">
                        {{ props.row.collected_target | currency }}
                    </template>
                    <template slot="days_left" slot-scope="props">
                        {{ /^[-]/g.test(props.row.days_left) || (props.row.days_left === 0 && props.row.status === "nonactive") ? "Sudah selesai" : props.row.days_left+" Hari" }}
                    </template>
                    <template slot="price_per_slot" slot-scope="props">
                        {{ props.row.detail_trader.price_per_slot | currency }}
                    </template>
                    <template slot="story" slot-scope="props">
                        {{ props.row.detail_trader.story.split(' ').length > 20 ? props.row.detail_trader.story.split(' ').splice(0, 20).join(' ')+" ... " : props.row.detail_trader.story }}
                    </template>
                    <template slot="return" slot-scope="props">
                        {{ props.row.detail_trader.return }} %
                    </template>
                    <template slot="contract" slot-scope="props">
                        {{ props.row.detail_trader.contract }} Bulan
                    </template>
                    <template slot="remaining_slots" slot-scope="props">
                        {{ props.row.remaining_slots }} Tersisa
                    </template>
                    <template slot="breakdown" slot-scope="props">
                        {{ props.row.table_trader.return_breakdown_month }}
                    </template>
                    <template slot="profit" slot-scope="props">
                        {{ props.row.profit.return_breakdown_profit }}
                    </template>
                    <template slot="total" slot-scope="props">
                        {{ props.row.total.return_breakdown_profit }}
                    </template>
                    <template slot="action" slot-scope="props">
                        <button @click.prevent="editPedagang(props.row.id)"><img src="/km-dash/assets/images/edit@3x.png" height="16"></button>
                        <button @click.prevent="deletePedagang(props.row.id)"><img src="/km-dash/assets/images/delete@3x.png" height="12"></button>
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
        let result = await this.server.get("traders");
        await this.$store.dispatch('setCampaignData', result.data.data);

        this.data = result.data.data;
    },
    data: function() {
        return {
            data: this.$store.getters.getCampaign,
            columns: [ 'image', 'title', 'collected_target', 'days_left', 'price_per_slot', 'story', 'return', 'contract', 'update', 'breakdown', 'profit', 'total', 'remaining_slots', 'status', 'action' ],
            rows: [],
            options: {
                filterByColumn: false,
                perPage: 10,
                filterable: [ 'title' ],    
                sortable: [ 'title', 'collected_target', 'days_left', 'remaining_slots' ],
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
                    "image": "Foto",
                    "title": "Judul Campaign",
                    "collected_target": "Target Campaign",
                    "days_left": "Waktu Tersisa",
                    "price_per_slot": "Harga/Slot",
                    "story": "Cerita Pendagang",
                    "return": "Estimasi Return",
                    "contract": "Lama Kontrak",
                    "breakdown": "Return Breakdown",
                    "profit": "Pengembalian Modal",
                    "total": "Total (Modal+Return)",
                    "remaining_slots": "Slot Tersisa"
                }
            }
        }
    },
    computed: {
        rowData: function() {
            let campaignData = [];
            for(let i = 0; i < this.data.length; i++) {
                campaignData.push({
                    ...this.data[i],
                    profit: {
                        ...this.data[i].table_trader[1]
                    },
                    total: {
                        ...this.data[i].table_trader[0]
                    },
                    detail_trader: {
                        ...this.data[i].detail_trader
                    },
                    table_trader: {
                        ...this.data[i].table_trader[2]
                    }
                });
            }
            return campaignData.sort(function(a, b) {
                if (new Date(b.createdAt).getTime() < new Date(a.createdAt).getTime()) {
                    return -1;
                }
                if (new Date(b.createdAt).getTime() > new Date(a.createdAt).getTime()) {
                    return 1;
                }

                return 0;
            });
        }
    },
    methods: {
        editPedagang(id) {
            this.$router.push({ path: `/campaign/${id}` })
        },
        deletePedagang(id) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "ingin menghapus campaign yang dipilih??",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Urungkan'
                }).then(async (result) => {
                if (result.value) {
                    let result = await this.server.delete("delete_trader", id);
                    
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