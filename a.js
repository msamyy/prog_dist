const bcrypt =require('bcrypt');




const f = async ()=>{
    mdp1hash = bcrypt.hashSync('azerty', 10);
    console.log(mdp1hash);
    mdp2hash = bcrypt.hashSync('amine', 10);
    console.log(mdp1hash, mdp2hash);
    const s = await bcrypt.compare('amine', mdp2hash);
    console.log(s);
}
f();