(function() {
    // Immediately Invoked Function Expression

    const people = {
        people : ['Tony', 'Homer'],
        init: function() {
            this.cacheDOM()
            this.bindEvents()
            this.render()
        },
        cacheDOM: function() {
            this.$el = $('#peopleModule')
            this.$button = this.$el.find('button')
            this.$input = this.$el.find('input')
            this.$ul = this.$el.find('ul')
            this.template = this.$el.find('#people-template').html()

        },
        bindEvents: function() {
            this.$button.on('click', this.addPerson.bind(this))
            this.$ul.delegate('i.del', 'click', this.deletePerson.bind(this))
        },
        render: function() {
            const data = {
                people: this.people
            }
            this.$ul.html(Mustache.render(this.template, data))
        },
        addPerson: function() {
            this.people.push(this.$input.val())
            console.log(this.$input.val());
            this.render()
            this.$input.val('')
        },
        deletePerson: function(e) {
            const $remove = $(e.target).closest('li') // Finds closest li on click event
            const i = this.$ul.find('li').index($remove) // What number index is the guy who got clicked

            this.people.splice(i, 1)
            this.render()
        }

    }

    people.init()
})()