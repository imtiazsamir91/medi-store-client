export default async function ShopPageById({
    params,
}:{
    params:Promise<{id:string}>;
}){ 
    const {id}= await params;
   
    return( 


        
            <div><h1> This is shop dynamik page{id}</h1></div> 

        
        
        )}