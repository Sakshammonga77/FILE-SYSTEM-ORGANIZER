let fs = require("fs");
let path  = require("path");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    img : ['png' , 'jpeg']

};
let input = process.argv.slice(2);
console.log(input);
let command = input[0];
switch(command){
    case "tree" : 
    treefn(input[1]);
    break;
    
    case "organize" :
    organizefn(input[1]); 
    break;

    case "help" :
    helpfn(input[1]);     
    break;
    
    default : 
    console.log("please input write command");
    break
}
function treefn(dirpath){
    console.log("tree has been implemented in the  directory" , dirpath);
}

function organizefn(dirpath){
    let newpath;
    if(dirpath == undefined){
        console.log("kindly enter the  right path");
    }else{
        let doesExists = fs.existsSync(dirpath);
        if (doesExists){
            newpath = path.join(dirpath , "organized_files");
            if(fs.existsSync(newpath)==false){
            
            fs.mkdirSync(newpath);
        }


        }
        else{
            console.log("kindly enter the  right path");
        }
    }
    organizehelper(dirpath , newpath);
}
function organizehelper(src , dest){
    let check = fs.readdirSync(src);
    // console.log(check);
    for (let i = 0 ; i < check.length; i++){
        let checkaddress = path.join(src , check[i]);
        let isfile = fs.lstatSync(checkaddress).isFile();
        if(isfile){
            let category = getCategory(check[i]);
            console.log(check[i] , "is of -->"  , category , "type");
            sendFile(checkaddress , dest , category);
        }

    }

}
function sendFile(srcFile , dest , category){
    let categoryPath = path.join(dest , category);
    if (fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFile);
    let destPathName = path.join(categoryPath , fileName); 
    fs.copyFileSync(srcFile , destPathName);
    fs.unlinkSync(srcFile);


}
function getCategory(file){
    let ext  = path.extname(file);
    ext = ext.slice(1);
    for (let type in types){
        let cTyperray = types[type];
        for(let i= 0 ; i<cTyperray.length ; i++){
            if(ext==cTyperray[i]){
                return type;
            } 
        }

    }
    return "others";
   
}

function helpfn(dirpath){
    console.log(`
    List of all the commands 
    tree "directory path"
    organize "directory path"
    help 
    `);
    console.log("help has been implemented in the  directory" , dirpath);
}