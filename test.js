
let templ = `
<div>
% v-if="todo.done" =>
<div class="test" ></div>
% v-if="todo.done" v-on:change="toggle(todo)" v-bind:checked="todo.done" =><div style="margin-bottom: 30px;" class="test" ></div>
</div>
`;

console.log(templ);

let parser = new Vueable();

console.log();
console.log(parser.parse(templ));