<template>
  <div>
    <ul :class="$style.list" v-if="issues.length">
      <ListItem
        v-for="item in issues"
        :key="item.id"
        :repository="repository"
        :issue="item" />
    </ul>

    <h3 v-if="!issues.length">No issues, create one.</h3>
  </div>
</template>

<script>
import ListItem from './ListItem';
import { mapState } from 'vuex';

export default {
  components: { ListItem },

  computed: mapState({
    issues: state => state.issues.list
  }),

  props: {
    repository: {
      type: String,
      required: true
    }
  },

  mounted() {
    const { commit, dispatch } = this.$store;
    commit('loading');
    dispatch('issues/fetchList', this.repository).then(() => commit('loaded'));
  }
};
</script>

<style lang="stylus" module>
.list
  display flex
  flex-direction column
</style>
