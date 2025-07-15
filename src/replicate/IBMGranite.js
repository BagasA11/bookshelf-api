import Replicate from "replicate";

export class IBMInstruct {
    // #token = process.env.REPLICATE_API_TOKEN
    #token;
    #model;
    #replicate
    constructor(){
        this.#token = process.env.REPLICATE_API_TOKEN;
        // console.log('🔐 Token:', this.#token)
        this.#model = 'ibm-granite/granite-3.3-8b-instruct';
        this.#replicate = new Replicate({ auth: this.#token });
    }

    run = async (input) => {
        const inputPromt = Input(input)
        var result = [];
        for await (const {event, data} of this.#replicate.stream(this.#model, { input: inputPromt })) {
            if (event === 'output') {
                result.push(data);
            }
        };
        return result
    }

    streamOutput = async function*(input) {
        const inputPrompt = Input(input);
        // console.log('input params: ', inputPrompt);
        let counter = 0;
        for await (const {event, data} of this.#replicate.stream(this.#model, { input: inputPrompt })) {
            if (event === 'output') {
                yield {id: counter++, data};
            }
        };
    }
}

export const Input = (input) => {
    const {top_k, top_p, prompt, max_tokens} = input;

    return {
        top_k: Number(top_k), top_p: Number(top_p),
        prompt: prompt, max_tokens: Number(max_tokens),
        min_tokens: 0, temperature: 0.6,
        presence_penalty: 0, frequency_penalty: 0
    };
}

// var prompt = `where is the USA capital`;
// // var prompt = `Write only a JavaScript function named sayHello that takes a single parameter <name> and returns the string "hello $name". Do not include any explanation, comments, or additional output. Only return the function. 
// // `;

// const model = new IBMInstruct();
// // const output = model.run(Input({
// //     top_k: 50, top_p: 0.9, prompt: input, maxTokens: 512 
// // }));

// // const promptObject = Input({ topK:50, top_p:0.9, prompt:prompt, maxTokens:512 });
// // console.log(promptObject);

// for await (const {id, data} of model.streamOutput(Input({ top_k:50, top_p:0.9, prompt:prompt, max_tokens:512 }))){
//     console.log(`${id} : ${data}`);
// }
