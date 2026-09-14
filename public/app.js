'use strict';
// Keep the FAQ compact while preserving native keyboard and no-JavaScript access.
document.querySelectorAll('.questions details').forEach(item=>item.addEventListener('toggle',()=>{
 if(item.open)document.querySelectorAll('.questions details').forEach(other=>{if(other!==item)other.open=false;});
}));
