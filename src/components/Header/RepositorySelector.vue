<template>
  <form :class="$style.wrapper" @submit.prevent="submit" v-click-outside="hideSuggestions">

    <input
      :class="$style.input"
      v-model="repository"
      @keyup="handleChange"
      @focus="handleFocus"
      type="text"
      placeholder="repository">

    <RepositoriesList
      :class="$style.suggestions"
      v-if="focus && suggestions.length"
      @select="selectRepository"
      :repositories="suggestions" />
  </form>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import RepositoriesList from '@/components/Repositories/List';

export default {
  components: { RepositoriesList },

  directives: {
    ClickOutside
  },

  data () {
    return {
      repository: this.$route.params.repository,
      suggestions: [],
      focus: false,
    }
  },

  watch: {
    '$route.params': function(params) {
      this.repository = params.repository;
    }
  },

  methods: {
    submit() {
      this.$router.push(`/${this.repository}/issues`);
      this.hideSuggestions();
    },

    handleFocus() {
      this.focus = true;
      this.handleChange();
    },

    handleChange() {
        const regex = new RegExp(`(${this.repository})`, 'gi');

      this.suggestions = this.$store.state.repositories.list
        .filter(repo => !!repo.name.match(regex));
    },

    hideSuggestions() {
      this.focus = false;
    },

    selectRepository(repository) {
      this.repository = repository;
      console.log(repository);
      this.submit();
    }
  }
}
</script>

<style lang="stylus" module>
.wrapper
  position relative

.input
  padding 10px 15px
  background #fafbfc
  border 1px solid #d1d5da
  border-radius 3px

  &:focus
    outline none

.suggestions
  position absolute
  z-index 1000
  top 100%
  left 0
  width 100%
  margin-top 10px
  background white
  border 1px solid #b9b3b3
  border-radius 3px
</style>
