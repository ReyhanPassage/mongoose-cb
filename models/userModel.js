const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        set : (val)=>{ return val.replace(/ /g, '' )}, // mengeset inputan user dengan fungsi menghapus semua spasi 
        validate(val){
            val = parseInt(val)
            //akan bernilai true jika inputan dari user meruapakan sebuah angka
            if(!isNaN(val)){
               throw new Error("Username harus merupakan sebuah string") 
            }
        }
    },
    name: {
        type: String,
        required : true, //wajib di isi user
        trim: true, //menghapus spasi diawal dan di akhir kalimat
        validate(val){
            val = parseInt(val)
            //akan bernilai true jika inputan dari user meruapakan sebuah angka
            if(!isNaN(val)){
               throw new Error("Name harus merupakan sebuah string") 
            }
        }
    },
    password: {
        type: String,
        required : true,
        trim: true,
        minlength : 7,  //min karakter password adalah 7
        validate(val) {
            if(val.toLowerCase().includes("password")){
                throw new Error("Password tidak boleh mengandung kata 'password'")
            }
        }
        
    },
    age: {
        type: Number,
        set : val => parseInt(val), //mengubah inputan jadi integer
        default : 0
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        validate(val){
            let result = validator.isEmail(val) // true false dari cek email dengan validator
            if(!result){
                throw new Error("format email salah")
            }
        }
    }, 
    avatar :{
        type : Buffer
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref :'Task'
    }]

}, {
    timestamps: true
})  

userSchema.methods.toJSON = function(){
    //untuk mengakses user
    let user = this.toObject()
    delete user.password
    delete user.tasks
    delete user.avatar
    
    return user
    
}

// membuat function sebelum proses user.save
userSchema.pre('save', async function(next){
    //enkripsi password dengan bcrypt
    let user=  this
    user.password= await bcrypt.hash(user.password, 8)

    next()

})

//membuat login function

userSchema.statics.login = async (email, password)=>{
    //menecari user berdasarkan email
    let user = await User.findOne({email})
    // jika user tidak ditemukan
    if(!user){
        throw new Error("email tidak ditemukan")
    }

    let result = await bcrypt.compare(password, user.password)
    if(!result){
        throw new Error("password salah")
    }
    
    return user // masukan kedalam resp
}

const User = mongoose.model('User', userSchema)

module.exports = User
