<template>
    <div class="history">
        <h3>
            Data Riwayat Investasi
        </h3>
        <div class="col-md ml-2 mr-2 mt-4 p-3 datatbl">
            <h5>
                Transaksi Investasi
            </h5>
            <div class="ml-2 mr-2 mt-4">
                <v-client-table :data="data" :columns="columns" :options="options">
                    <template slot="nominal_investasi" slot-scope="props">
                        {{ props.row.nominal_investasi | currency }}
                    </template>
                    <template slot="createdAt" slot-scope="props">
                        {{ moment(props.row.createdAt).format("DD MMM YYYY") }}
                    </template>
                    <template slot="gross_amount" slot-scope="props">
                        {{ props.row.gross_amount | currency }}
                    </template>
                    <template slot="quantity" slot-scope="props">
                        {{ props.row.quantity }} slot
                    </template>
                    <template slot="trader_return" slot-scope="props">
                        {{ props.row.trader_return }} %
                    </template>
                    <template slot="trader_contract" slot-scope="props">
                        {{ props.row.trader_contract }} Bulan
                    </template>
                    <template slot="transaction_status" slot-scope="props">
                        <span v-if="props.row.transaction_status === 'expire'">
                            Dibatalkan oleh investor
                        </span>
                        <span v-else>
                            {{ props.row.transaction_status }}
                        </span>
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
    created: function() {
        
    },
    data: function() {
        return {
            data: this.$store.getters.getUserTransaction,
            columns: [ 'id', 'createdAt', 'fullname', 'trader_name', 'gross_amount', 'quantity', 'trader_return', 'trader_contract', 'transaction_status' ],
            options: {
                filterByColumn: false,
                perPage: 10,
                filterable: [ 'profile_user.fullname', 'email' ],
                sortable: [ 'profile_user.fullname' ],
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
                    id: "No Transaksi",
                    createdAt: "TGL Transaksi",
                    fullname: "Nama Investor",
                    trader_name: "Tujuan",
                    gross_amount: "Nominal Investasi",
                    quantity: "Jumlah Slot",
                    trader_return: "Estimasi Return",
                    trader_contract: "jangka waktu dikembalikan",
                    transaction_status: "Status"
                }
            }
        }
    },
    methods: {
        editInvestor: function(id) {
            this.$router.push({ path: `/investor/${id}` })
        },
        deleteInvestor: function(id) {
            alert(JSON.stringify(id))
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
    .history div div .VueTables .table-responsive table {
        width: 1400px
    }
    .history div div .VueTables .table-responsive table thead tr #VueTables_th--trader_contract {
        width: 130px
    }
</style>