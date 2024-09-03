import db from "../db.js";

import bcrypt from 'bcrypt'

export const createUser = (req, res) => {
    console .log(req.file)

    const profile = req.file.filename;
    const { f_name, l_name, address, email, password, phone, gender, dob } = req.body;
    const created_at = new Date();

    const checkEmailSql = "SELECT * FROM user WHERE email = ?";
    db.query(checkEmailSql, [email], (err, result) => {
        if (err) {
            return res.send(err);
        }
        if (result.length > 0) {
            return res.send({
                statusCode: 300,
                message: "Email Already Exists!!"
            });
        } else {
            const checkPhoneSql = "SELECT * FROM user WHERE phone = ?";
            db.query(checkPhoneSql, [phone], (err, data) => {
                if (err) {
                    return res.send(err);
                }
                if (data.length > 0) {
                    return res.send({
                        statusCode: 300,
                        message: "Phone Number Already Exists!!"
                    });
                } else {

                  bcrypt.hash(password, 10,(err, hash)=>{

                    if(err){
                      res.send(err);
                    }else{
                          const insertUserSql = `
                            INSERT INTO user(f_name, l_name, address, email, password, phone, gender, dob, created_at, profile) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `;
                          const values = [f_name, l_name, address, email, hash, phone, gender, dob, created_at, profile];
                        db.query(insertUserSql, values, (err, result) => {
                            if (err) {
                                   return res.send(err);
                            }
                            res.send({
                                statusCode: 200,
                                message: "User Added Successfully!!"
                            });
                    });
                    }

                  } );
                    // const insertUserSql = `
                    //     INSERT INTO user(f_name, l_name, address, email, password, phone, gender, dob, created_at, profile) 
                    //     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    // `;
                    // const values = [f_name, l_name, address, email, password, phone, gender, dob, created_at, profile];

                    // db.query(insertUserSql, values, (err, result) => {
                    //     if (err) {
                    //         return res.send(err);
                    //     }
                    //     res.send({
                    //         statusCode: 200,
                    //         message: "User Added Successfully!!"
                    //     });
                    // });
                }
            });
        }
    });
};


export const getUser = (req, res) => {
  const sql = "select * from user";
  db.query(sql, (err, data) => {
    if (err) {
      res.send({
        statusCode: 400,
        message: "something went wrong!",
        err: err,
      });
    } else {
      if (data.length === 0) {
        res.send({ statusCode: 300, message: "user not available!!" });
      } else {
        res.send(data);
      }
    }
  });
};

export const getSingleUser = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "select * from user where user_id=?";
  db.query(sql, id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result.length === 0) {
        res.send("user not found");
      } else {
        // res.send(result)
        // const {password,...rest}=result[0]
        res.send(result);
      }
    }
  });
};

//update user
export const updateUser = (req, res) => {
    console .log(req.file)

    const profile = req.file.filename;
    const id = parseInt(req.params.id);
    const { f_name, l_name, address, email, password, phone, gender, dob } = req.body;
    const updated_at = new Date();  // Automatically set updated_at to the current date and time

    const updateUserSql = `
        UPDATE user SET f_name = ?, l_name = ?, address = ?, email = ?, password = ?, phone = ?, gender = ?, dob = ?, updated_at = ?, profile = COALESCE(?, profile)
        WHERE user_id = ?
    `;
    const values = [f_name, l_name, address, email, password, phone, gender, dob, updated_at,profile, id];

    db.query(updateUserSql, values, (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.status(200).send("User Updated Successfully!!");
    });
};


//delete user
export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "delete from user where user_id=?";
  db.query(sql, id, (err, data) => {
    if (err) res.send(err);
    res.send({ data: data, message: "user deleted sucessfully" });
  });
};
