const Handlebars =require('handlebars');

module.exports = {
    //create suport funtion
    sum: (a, b) => a + b,
    mul: (a, b) => a * b,
    sortable: (field,sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        };
        const types = {
            default: 'asc',
            asc: 'desc',
            desc: 'asc',
        };
        const href = Handlebars.escapeExpression('?_sort&column='+field+'&type='+types[sortType]+'');

        const result = '<a href="'+ href +'"><span class="'+icons[sortType]+'"></span></a>';
        return result;
    },
    imageload: (image,type) => {
        return 'data:'+type+';charset=uft-8;base64,'+image.toString('base64');
    }
};