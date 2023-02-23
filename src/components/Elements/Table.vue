<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="header in headers" :key="header">{{ row[header] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  }
}
</script>