function Vueable() {
    let atom_re = />(\s*%([^<>]+)=>)\s*</;
    let html_elem_re = /<\w+/; //todo text closing tag as well.

    function Atom(match, index) {
        this.text = match;
        this.index = index;
    }

    this.parse = function (template) {
        // Getting atoms goes from top to bot.
        // Applying atoms goes from bot to top.

        function get_all_atoms() {
            function get_next_atom() {
                // Also deletes the string from the template.
                let match = atom_re.exec(template);
                if (match === null){
                    return null;
                }else{
                    let start = match.index+1;
                    let end = start + match[1].length;
                    template = template.slice(0, start) + template.slice(end);
                    return new Atom(match[2], start)
                }
            }

            let _atoms = Array();
            let n_atom = get_next_atom();
            while (n_atom !== null){
                _atoms.push(n_atom);
                n_atom = get_next_atom();
            }
            return _atoms;
        }
        let atoms = get_all_atoms();

        return function apply_atoms() {
            function insert(str, sub_str, idx){
                return str.slice(0, idx) + sub_str + str.slice(idx)
            }
            atoms.reverse();
            atoms.forEach((atom) => {
                console.log(atom.index);
                let tag = /<\w+ /.exec(template.slice(atom.index));
                let index;
                if (tag !== null){
                    index = atom.index + tag[0].length;
                }else{
                    throw `no tag found at ${template.slice(atom.index)}`
                }

                template = insert(template, `${atom.text} `, index )
            });
            return template;
        }();

    }
}