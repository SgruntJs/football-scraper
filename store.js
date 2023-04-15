import { createStore } from 'vuex';

export default createStore({
  state: {
    countries: [
      { id: 1, name: 'Italy', title: 'Serie A' },
      { id: 2, name: 'Argentina', title: 'Argentina' },
      { id: 3, name: 'Portugal', title: 'Liga Portugal' },
      { id: 4, name: 'Portugal2', title: 'Liga Portugal 2' },
      { id: 5, name: 'Poland', title: 'Ekstraklasa' },
      { id: 6, name: 'Poland2', title: 'I Liga' },
      { id: 7, name: 'Switzerland' , title: 'Super League'},
      { id: 8, name: 'Turkey', title: 'Super Lig' },
      { id: 9, name: 'Turkey2', title: '1.Lig' },
      { id: 10, name: 'Peru', title: 'Liga 1' },
      { id: 11, name: 'Colombia', title: 'Primera A' },
      { id: 12, name: 'Chile', title: 'Primera A' },
      { id: 13, name: 'Uruguay', title: 'Primera Division' },
      { id: 14, name: 'Bolivia', title: 'Primera Division' },
      { id: 15, name: 'Mexico', title: 'Liga MX' },
      { id: 16, name: 'Netherlands', title: 'Eredivisie'},
      { id: 17, name: 'Brazil', title: 'Serie A'},
      { id: 18, name: 'Australia', title: 'A-League'}
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
});
