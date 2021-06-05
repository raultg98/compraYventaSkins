if(!expReg.test(correo) || contrasenia.length < 3){
    erroresLogin.push({ text: 'EL CORREO O LA CONTRASEÑA NO SON VALIDOS'});
}else {
    // const correos = await pool.query('SELECT nombre FROM usuarios');
    pool.query('SELECT correo FROM usuarios WHERE correo = ?', correo, (err, result, fields) => {
        if(err){
            console.log(err);
        }else {
            const correosBD = [];

            result.forEach(corr => {
                correosBD.push(corr.correo);
            });

            if(correosBD.includes(correo)){
                pool.query('SELECT contrasenia FROM usuarios WHERE correo = ?', correo, (err, result, fields) => {
                    if(err){
                        console.log(err);
                    }else {
                        // COMPRUEBO LAS CONTRASEÑAS
                        const contraseniaBD = result[0].contrasenia;

                        console.log(contraseniaBD)

                        bcrypt.compare(contrasenia, contraseniaBD, (err, res) => {
                            if(err) console.log(err);

                            if(res){
                                req.session.usuario = correo;
                            }else{
                                erroresLogin.push({ text: 'LA CONTRASEÑA ES INCORRECTA'});
                            }
                        });
                    }
                });
            }else {
                erroresLogin.push({ text: 'EL CORREO NO ESTA REGISTRADO'})
            }
        }
    })
}