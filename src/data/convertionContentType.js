import { MdChat } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { MdOutlineTopic } from "react-icons/md";
// export const contentTypeData = [
//     {
//         type:"Chat",
//         link:'chat',
//         icon:<MdChat/>,
//         iconBg:"bg-blue-600/10",
//         iconColor:"text-blue-600",
//         description:"this is simple chat model , you give simple prompt and Ai can be genarate a text for you base on your requirement",
//         aiPrompt:[],
//         formData:[
//             {
//                 name:"prompt",
//                 placeholder:"Enter Prompt base your requirment... ",
//                 required: true
//             }
//         ]
//     } ,
//     {
//         type:"Project Idea Genarate",
//         link:'project-idea-gen',
//         icon:<FaRegLightbulb/>,
//         iconBg:"bg-pink-600/10",
//         iconColor:"text-pink-600",
//         description:"this is simple chat model , you give simple prompt and Ai can be genarate a text for you base on your requirement",
//         aiPrompt:[],
//         formData:[
//             {
//                 name:"prompt",
//                 placeholder:"Enter Prompt base your requirment... ",
//                 required: true
//             }
//         ]
//     },
//     {
//         type:"Project Documentation",
//         link:'project-doc',
//         icon:<IoDocumentOutline/>,
//         iconBg:"bg-purple-600/10",
//         iconColor:"text-purple-600",
//         description:"Genarate Project Document or How to make your Project Base on Your Idea , provite name , goal , using technology of your project , write clear prompt for best exprience  ",
//         aiPrompt:["Genarate a documentation for this project idea and add more information and flowchar as a editor formate not use image of flowchar or diagram " , "how to make this project base on my idea" ],
//         formData:[
//             // {
//             //     name:"name",
//             //     placeholder:"Project Name",
//             //     required: false
//             // },
//             // {
//             //     name:"target-user",
//             //     placeholder:"Target User",
//             //     required:false

//             // },
//             // {
//             //     name:"technology",
//             //     placeholder:" Using Technology",
//             //     require: false
//             // },
//             {
//                 name:"prompt",
//                 placeholder:"Write project name , target users , using technology , project goal , project details (Required) ",
//                 required:true
//             }
//         ]
//     },
//     {
//         type:"Any Topic Documentation",
//         link:'topic-doc',
//         icon:<MdOutlineTopic/>,
//         iconBg:"bg-green-600/10",
//         iconColor:"text-green-600",
//         description:"This is actuall use for your reserch pappose , in this section write quary for any topic , and genarate document base on your requirement .",
//         aiPrompt:["describe more details on this given topic and highlight most importent points" , "please provite more refarance and links (not describe this point)"],
//         formData:[
//             {
//                 name:"prompt",
//                 placeholder:"Enter your Quary... ",
//                 required: true
//             }
//         ]

//     }
   
// ]

export const contentTypeData = [
    {
        type:"Chat",
        link:'chat',
        icon:<MdChat/>,
        iconBg:"bg-blue-600/10",
        iconColor:"text-blue-600",
        description:"This is a simple chat model where you provide a prompt, and AI will generate a text response based on your input.",
        aiPrompt:["Generate a response based on the provided prompt."],
        formData:[
            {
                name:"prompt",
                placeholder:"Enter a prompt based on your requirement... ",
                required: true
            }
        ]
    },
    {
        type:"Project Idea Generation",
        link:'project-idea-gen',
        icon:<FaRegLightbulb/>,
        iconBg:"bg-pink-600/10",
        iconColor:"text-pink-600",
        description:"This tool helps generate project ideas based on a simple prompt provided by the user. AI will generate suggestions based on the user's input.",
        aiPrompt:["Generate a creative project idea based on the provided prompt." , "And provite complete idea how to build it"],
        formData:[
            {
                name:"prompt",
                placeholder:"Enter a prompt based on your requirement... ",
                required: true
            }
        ]
    },
    {
        type:"Project Documentation",
        link:'project-doc',
        icon:<IoDocumentOutline/>,
        iconBg:"bg-purple-600/10",
        iconColor:"text-purple-600",
        description:"Generate project documentation or instructions on how to develop your project based on your idea. Provide the name, goal, and technology stack for your project for the best results.",
        aiPrompt:[
            "Generate a comprehensive project documentation including details like the project name, goals, and technologies used. Add a flowchart in editor format (no images).", 
            "Provide detailed steps on how to develop the project based on the given idea."
        ],
        formData:[
            {
                name:"prompt",
                placeholder:"Write the project name, target users, technologies used, project goal, and other important details (Required).",
                required:true
            }
        ]
    },
    {
        type:"Any Topic Documentation",
        link:'topic-doc',
        icon:<MdOutlineTopic/>,
        iconBg:"bg-green-600/10",
        iconColor:"text-green-600",
        description:"Use this tool for research purposes. Write a query on any topic, and AI will generate a detailed document based on your input.",
        aiPrompt:[
            "Generate an in-depth explanation of the topic, highlighting the key points.", 
            "in depth concept of importent points ",
            "Provide additional references and links without describing the points in detail."
        ],
        formData:[
            {
                name:"prompt",
                placeholder:"Enter your query... ",
                required: true
            }
        ]
    }
];
