export class Usuario{
    constructor ( 
        public nombre:string, 
        public apellidoP:string, 
        public apellidoM:string, 
        public email:string, 
        public password:string,
        public img?: string,
        public role?: string,
        public _id?:string
         ){ }
}