$('#post-comment').hide(); //de esta forma el card-body de los comentarios siempre esta oculto
$('#btn-toggle-comment').click(e =>{
    e.preventDefault();
    $('#post-comment').slideToggle(); //evento que me deja deslizar haci arriba o haci abajo el card-body de los comentarios, para poder hacerlo lo que hago es darle un ID al card-body, de esta manera yo lo puedo llamar

});


//boton like
$('#btn-like').click(function(e) {
    e.preventDefault();
    let imgId = $(this).data('id');
    
    //peticion POST
    $.post('/images/' + imgId + '/like') //metodo post esta en routs index.js, en el post de los likes
        .done(data => {
            console.log(data); 
            $('.likes-count').text(data.likes); //con esto alteramos lo que estamos colocanco en el span de image.hbs de la carpeta views, lo que hace es seledcionar un elemento al seleccionar alteres el texto, modificas los datos, pero al ser un obj solo muestras los likes            
        });
}); 

//boton request
$('#btn-delete').click(function(e) {
    e.preventDefault();
    let $this = $(this);
    const response = confirm('Estas seguro de querer eliminar esta imagen?');
    if (response) {
        let imgId = $this.data('id');
        $.ajax({
            url: '/images/' + imgId,
            type: 'DELETE'

        })
        .done(function (result){
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');    
            $this.append('<span> Eliminado! </span>');
            //console.log(result);
        })
    }
});