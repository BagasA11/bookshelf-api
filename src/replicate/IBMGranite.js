import Replicate from "replicate";

export class IBMInstruct {
    // #token = process.env.REPLICATE_API_TOKEN
    #token;
    #model;
    #replicate
    constructor(){
        this.#token = process.env.REPLICATE_API_TOKEN;
        console.log('🔐 Token:', this.#token)
        this.#model = 'ibm-granite/granite-3.1-8b-instruct';
        this.#replicate = new Replicate({
            auth: this.#token,
        });
    }

    run = async (prompt, system_prompt) => {
        var input = {
            prompt: prompt,
            system_prompt: system_prompt
        };
        var result = '';
        // try{
        //     console.log('⏳ Sending prompt...');
        //     const output = await this.#replicate.run(this.#model, {input}); 
        //     console.log('✅ Response received!');
        //     result = output.join('');
        // }catch(err){
        //     console.log(err);
        //     result = err.toString();
        // }finally{
        //     return result;
        // }
        console.log('⏳ Sending prompt...');
        const output = await this.#replicate.run(this.#model, {input}); 
        console.log('✅ Response received!');
        return output.join('');

    }
}

const model = new IBMInstruct();
var output = await model.run('create javascript function of summation 2 input numbers', 'consider you are a javascript programmer');

console.log(output);