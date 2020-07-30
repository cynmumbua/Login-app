
const Helper = {
    isValidEmail(email){
        return /\S+@\S+\.\S+/.test(email);
    }
}

export default Helper;