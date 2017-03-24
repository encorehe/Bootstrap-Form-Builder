define([
    "jquery", "underscore", "backbone"
    , "collections/snippets", "collections/my-form-snippets"
    , "views/tab", "views/my-form"
    , "text!data/form.json"
    , "text!templates/app/render.html",
], function ($, _, Backbone
    , SnippetsCollection, MyFormSnippetsCollection
    , TabView, MyFormView
    , formJSON
    , renderTab) {
    return {
        initialize: function () {

            //Bootstrap tabs from json.
            new TabView({
                title: "Input"
                , collection: new SnippetsCollection(JSON.parse(formJSON))
            });
            /*new TabView({
             title: "Rendered"
             , content: renderTab
             });*/

            //Make the first tab active!
            $("#components .tab-pane").first().addClass("active");
            $("#formtabs li").first().addClass("active");
            // Bootstrap "My Form" with 'Form Name' snippet.
            new MyFormView({
                title: "Original"
                , collection: new MyFormSnippetsCollection()
            });

// 【Text Input】text：type，id，label，content，description，required
// 【Text Area】textarea：type，id，labe，content
// 【Multiple Radios】radio：type，id，label，content(array)，require[，selectedIndex]
// 【Multiple Checkboxes】checkbox：type，id，label，content(array)，require[，selectedArray]
// 【Select Basic】select：type，id，label，content(array)[，selectedIndex]
// 【File Button】file：type，id，label

            var renderFormData = function() {

                window.backboneFormData = [];
                var data = JSON.parse(backboneModels);

                data && data.forEach(function(val, index, arr) {
                    var fields = val.fields;
                    var item = {
                        id: fields.id.value,
                        label: fields.label.value
                    };
                    if (val.title == 'Text Input') {
                        item.type = 'text';
                        item.content = fields.placeholder.value;
                        item.description = fields.helptext.value;
                        item.required = fields.required.value;
                    } else if (val.title == 'Text Area') {
                        item.type = 'textarea';
                        item.content = fields.textarea.value;
                    } else if (val.title == 'Multiple Radios') {
                        item.type = 'radio';
                        item.content = fields.radios.value;
                        item.required = fields.required.value;
                    } else if (val.title == 'Multiple Checkboxes') {
                        item.type = 'checkbox';
                        item.content = fields.checkboxes.value;
                        item.required = fields.required.value;
                    } else if (val.title == 'Select Basic') {
                        item.type = 'select';
                        item.content = fields.options.value;
                    } else if (val.title == 'File Button') {
                        item.type = 'file';
                    }

                    backboneFormData.push(item);
                })

                console.log(JSON.stringify(backboneFormData));
                // console.log($('#target').html())
            };
            $('#btnSeeFormData').on('click', renderFormData)
        }
    }
});
