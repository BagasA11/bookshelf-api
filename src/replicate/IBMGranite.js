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
        var result = '';
        for await (const event of this.#replicate.stream(this.#model, { input: inputPromt })) {
            result += event.toString();
        };
        return result
    }
}

const Input = (input) => {
    const {topK, top_p, prompt, maxTokens} = input;

    return {
        top_k: topK, top_p: top_p,
        prompt: prompt, max_tokens: maxTokens,
        min_tokens: 0, temperature: 0.6,
        presence_penalty: 0, frequency_penalty: 0
    };
}

const model = new IBMInstruct();
const example = Input({
    top_k: 50,
    top_p: 0.9,
    prompt: "create javascript function of summation 2 input numbers",
    max_tokens: 512,
})
var output = await model.run(example);

console.log(output);