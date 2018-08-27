function char(name,count,tashkeel) {
  this.name = name;
  this.count = count;
  // dictionary
  this.tashkeel = tashkeel
}

function system_class(chares)
{
  //array of char
  this.groups = chares
}

function aya_class(aya_num,total_char_count,count_alphabet,tashkeel_counts,systems){
  this.aya_num = aya_num;
  this.total_char_count = total_char_count;
  // array char
  this.count_alphabet = count_alphabet
  //dictionary
  this.tashkeel_counts_for_aya = tashkeel_counts

  //array of system
  this.systems = systems
}

function sura(sura_name,sura_num,char_count_in_sura,ayat) {
    this.sura_name = sura_name;
    this.sura_num = sura_num;
    this.char_count_in_sura = char_count_in_sura;
    //array
    this.ayat = ayat
}

function Quran(total_char_count_in_quran,swar){
  this.total_char_count_in_quran = total_char_count_in_quran;
  //dictionary
  // this.total_system_counts = {}
  // array
  this.Swar = swar;
  this.total_swar_num = swar.length
  this.ayat_num = 0
  this.tashkeel_counts = {}
  this.systems_info = []

  this.all_alphabets = []
  if (this.total_swar_num > 0 ){
      for (i = 0; i < this.Swar[0].ayat[0].count_alphabet.length ; i++){
        this.all_alphabets.push(this.Swar[0].ayat[0].count_alphabet[i].name)
      }
      for (var tash in this.Swar[0].ayat[0].tashkeel_counts_for_aya)
      {
        this.tashkeel_counts[tash] = 0
      }
  }

  //get information of Quran
  for( n = 0; n<this.Swar.length; n++)
  {
    //count ayat_num
    this.ayat_num += this.Swar[n].ayat.length
    //count every taskeel shape count
    for( i = 0; i < this.Swar[n].ayat.length; i++)
    {
      for (var tash in this.Swar[n].ayat[i].tashkeel_counts_for_aya)
      {
        this.tashkeel_counts[tash] += this.Swar[n].ayat[i].tashkeel_counts_for_aya[tash]
      }
    }
  }

  // get systems that exsist in Quran
  systms = this.Swar[0].ayat[0].systems
  for ( i = 0; i < systms.length; i++ )
  {
    this.systems_info.push(systms[i].groups.length)
  }
}


function Total_Quran_info(swar_names, systems, tashkeels, total_char_count_in_quran, ayat_num){
    // array of swar names
    this.swar_names = swar_names
    // array of chars
    this.systems = systems
    // dictionary of tashkeels
    this.tashkeels = tashkeels
    this.total_char_count_in_quran = total_char_count_in_quran
    this.swar_num = swar_names.length-1
    this.ayat_num = ayat_num
    this.systems_info = []

    for ( i = 0; i < this.systems.length; i++ )
    {
	this.systems_info.push(this.systems[i].groups.length)
    }
}

current_system_info = ''
system_change_state = false
//this function to get real system that choice in drop list
function get_current_system()
{
  if (current_system_info == '' || system_change_state)
  {
      current_system_info = All_Quran_info_.systems[current_system].groups
      system_change_state = false;
      return current_system_info
  }
  else {
    return current_system_info;
  }
}

//***********************************************************************/
Quran_ = ''
All_Quran_info_ = ''
current_system = 0
current_sura = 0
addition_coulme = "aya_num"



function generat_head_cell(text,class_s,data_column,id){
  // console.log();
    return "<th id=\""+id+"\" class=\""+class_s+" hov_cell\" data-column=\""+data_column+"\">"+text+"</th>"
}


function show_all_info_mode(){
    //sura cell
    table_content = "<tr id=\"total_ayat_info\" class=\"all_aya hov_cell aya all_aya_0\"><td>All</td></tr>"
    all_body = "<td id=\"total_ayat_info\" class=\"column100 column1 hov_cell char_cell\" data-column=\"column1\"><table class=\"all_table aya\">"+table_content+"</table></td>"
    
    //aya cell
    table_content = "<tr id=\"all_aya\" class=\"aya1 hov_cell aya\"><td>All</td></tr>"
    ayat_small_table = "<table class=\"all_table aya\">"+table_content+"</table>"
    all_body += "<td class=\"column100 column2 char_cell\" data-column=\"column2\">"+ayat_small_table+"</td>"

    //char cell's
    system = get_current_system()
    for(j = 0; j < system.length; j++){
        tashkeel_cahars = ""
        tashkeel_counts = ""
        tashkeel_dictionary = All_Quran_info_.systems[current_system].groups[j].tashkeel
        for(var tshkl in tashkeel_dictionary){
          // console.log(tashkeel_dictionary)
          tashkeel_cahars+="<td id=\"tashkeel_shape\" class=\"column100\">"+tshkl+"</td>"
          tashkeel_counts+="<td id=\"tashkeel_shape_count\" class=\"column100\">"+tashkeel_dictionary[tshkl]+"</td>"
        }
        char_content = "<tr>"+tashkeel_cahars+"</tr>"+"<tr>"+tashkeel_counts+"</tr>"
        table_char_id = "char_"+j
        table_chars_content = "<table id=\""+table_char_id+"\" class=\"char_counts_table table_char all_aya clicked"+j+"\">"+char_content+"</table>"
        table_content = "<tr class=\"all_aya_0\"><td>"+table_chars_content+"</td></tr>"
	alphabet_content = "<table class=\"all_table\">"+table_content+"</table>"
	all_body += "<td class=\"column100 column"+(j+3)+" char_cell\" data-column=\"column"+(j+3)+"\">"+alphabet_content+"</td>"
    }
    //merge all html
    sura_html = "<tr class=\"row100 all\">" +all_body+ "</tr>"
    return sura_html
}


function generat_sura_row(sura_info,start_pos,end_pos){
    content = []
    //make sura name cell
    sura_id = "sura_"+(sura_info.sura_num-1)
    // ---------------------------------------------
    table_content = ""
    // for(j = 0; j < sura_info.ayat.length; j++){------------------------------------
    for(j = start_pos; j < end_pos; j++){
      // console.log(sura_info.sura_name)
      aya_id = sura_id+"_aya_"+j
      table_content += "<tr id=\""+aya_id+"\" class=\"aya"+sura_info.ayat[j].aya_num+" hov_cell aya\"><td>"+ sura_info.sura_num+"    : "+sura_info.sura_name+"</td></tr>"
    }
    content.push(table_content)
    //----------------------------------------------
    sura_body = "<td id=\""+sura_id+"\" class=\"column100 column1 hov_cell "+sura_info.sura_name+" char_cell\" data-column=\"column1\">"+"<table class=\""+sura_info.sura_name+"_table aya\">"+table_content+"</table>"+"</td>"

    //***************make aya_num cell --  class aya **************************
    table_content = ""
    // for(j = 0; j < sura_info.ayat.length; j++){---------------------
    for(j = start_pos; j < end_pos; j++){
      // console.log(sura_info.sura_name)
      aya_id = sura_id+"_aya_"+j
      table_content += "<tr id=\""+aya_id+"\" class=\"aya"+sura_info.ayat[j].aya_num+" hov_cell aya\"><td>"+sura_info.ayat[j].aya_num+"</td></tr>"
    }
    content.push(table_content)
    ayat_small_table = "<table class=\""+sura_info.sura_name+"_table aya\">"+table_content+"</table>"
    sura_body += "<td class=\"column100 column2 "+sura_info.sura_name+" char_cell\" data-column=\"column2\">"+ayat_small_table+"</td>"
    //*****************************************************************

    system = get_current_system()
    //*************make char's cell ************************************
    for(j = 0; j < system.length; j++){
      table_content = ""
      // for(n = 0; n < sura_info.ayat.length; n++){-------------------
      for(n = start_pos; n < end_pos; n++){
        aya = sura_info.ayat[n]
        char_content=""
        tashkeel_cahars = ""
        tashkeel_counts = ""
        tashkeel_dictionary = aya.systems[current_system].groups[j].tashkeel
        for(var tshkl in tashkeel_dictionary){
          // console.log(tashkeel_dictionary)
          tashkeel_cahars+="<td id=\"tashkeel_shape\" class=\"column100\">"+tshkl+"</td>"
          tashkeel_counts+="<td id=\"tashkeel_shape_count\" class=\"column100\">"+tashkeel_dictionary[tshkl]+"</td>"
        }
        char_content = "<tr>"+tashkeel_cahars+"</tr>"+"<tr>"+tashkeel_counts+"</tr>"
        table_char_id = sura_id+"_aya_"+n+"_char_"+j
        table_chars_content = "<table id=\""+table_char_id+"\" class=\"char_counts_table table_char "+sura_id+"_aya_"+n+" clicked"+j+"\">"+char_content+"</table>"
        table_content += "<tr class=\"aya"+aya.aya_num+"\"><td>"+table_chars_content+"</td></tr>"
      }
      content.push(table_content)
      alphabet_content = "<table class=\""+sura_info.sura_name+"_table\">"+table_content+"</table>"
      sura_body += "<td class=\"column100 column"+(j+3)+" "+sura_info.sura_name+" char_cell\" data-column=\"column"+(j+3)+"\">"+alphabet_content+"</td>"
    }
    //*****************************************************************

    //merge all html
    sura_html = "<tr class=\"row100 "+sura_info.sura_name+"\">" +sura_body+ "</tr>"
    return [sura_html,content]
}


function get_char_info(char_id)
{
  char_coun = 0
  tash_coun = {}
  //loop on swar
  for( i = 0; i < Quran_.Swar.length; i++)
  {
    for( n = 0; n < Quran_.Swar[i].ayat.length; n++)
    {
      aya = Quran_.Swar[i].ayat[n]
      char_coun += aya.systems[current_system].groups[char_id].count
      for(var tash in aya.systems[current_system].groups[char_id].tashkeel)
      {
        if(isNaN(tash_coun[tash]))
        {
          tash_coun[tash] = aya.systems[current_system].groups[char_id].tashkeel[tash]
        }
        else
        {
          tash_coun[tash] += aya.systems[current_system].groups[char_id].tashkeel[tash]
        }
      }
    }
  }
  return [char_coun,tash_coun]
}

function display_fixed_div_all_quran()
{
    Q_content = "<td class=\"f_col\">عدد السور<br>"+ All_Quran_info_.swar_num +"</td>"
    Q_content += "<td class=\"f_col\">عدد الايات<br>"+ All_Quran_info_.ayat_num +"</td>"
    Q_content += "<td class=\"f_col\">عدد الحروف<br>"+ All_Quran_info_.total_char_count_in_quran +"</td>"
    tash_shape = ""
    tash_count = ""
    for (var tash in All_Quran_info_.tashkeels)
    {
	// tashkeel_table += "<h1>"+tash+"  "+Quran_.tashkeel_counts[tash]+"</h1>"
	tash_shape += "<td id=\"tashkeel_for_fixed_dev\">"+tash+"</td>"
	tash_count += "<td id=\"tashkeel_counts_for_fixed_dev\">"+All_Quran_info_.tashkeels[tash]+"</td>"
    }
    Q_content += "<td><table><tr>"+tash_shape+"</tr><tr>"+tash_count+"</tr></table></td>"
    return  "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"
}


function display_fixed_div_sura(id)
{
  sura_id = 0//id.split("_")[1]
  Q_content = "<td class=\"f_col\">"+ Quran_.Swar[sura_id].sura_num+" :: "+Quran_.Swar[sura_id].sura_name +"</td>"
  Q_content += "<td class=\"f_col\"> عدد الايات<br>"+ Quran_.Swar[sura_id].ayat.length +"</td>"
  Q_content += "<td class=\"f_col\">عدد الحروف<br>"+ Quran_.Swar[sura_id].char_count_in_sura +"</td>"
  tash_shape = ""
  tash_count = ""
  sura_tashkell_count = {}
  for( i = 0; i < Quran_.Swar[sura_id].ayat.length; i++)
  {
    aya_dic = Quran_.Swar[sura_id].ayat[i].tashkeel_counts_for_aya
    for(var tash in aya_dic)
    {
      if(isNaN(sura_tashkell_count[tash]))
      {
        sura_tashkell_count[tash] = aya_dic[tash]
      }
      else
      {
        sura_tashkell_count[tash] += aya_dic[tash]
      }
    }
  }
  for (var tash in sura_tashkell_count)
  {
    // tashkeel_table += "<h1>"+tash+"  "+Quran_.tashkeel_counts[tash]+"</h1>"
    tash_shape += "<td id=\"tashkeel_for_fixed_dev\">"+tash+"</td>"
    tash_count += "<td id=\"tashkeel_counts_for_fixed_dev\">"+sura_tashkell_count[tash]+"</td>"
  }
  Q_content += "<td><table><tr>"+tash_shape+"</tr><tr>"+tash_count+"</tr></table></td>"
  return "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"
}


function display_fixed_div_char(id)
{
    char_id = id.split("_")[1]
    Q_content = "<td class=\"f_col\">"+ Quran_.Swar[0].sura_name+"</td>"
    Q_content += "<td class=\"f_col\">"+ get_current_system()[char_id].name +"</td>"
    //return [char_count,{ taskeel1:cont , taskeel2:cont ..... }]
    char_info = get_char_info(char_id)
    Q_content += "<td class=\"f_col\">عدد الحروف<br>"+ char_info[0] +"</td>"
    tash_shape = ""
    tash_count = ""
    for (var tash in char_info[1])
    {
	// tashkeel_table += "<h1>"+tash+"  "+Quran_.tashkeel_counts[tash]+"</h1>"
	tash_shape += "<td id=\"tashkeel_for_fixed_dev\">"+tash+"</td>"
	tash_count += "<td id=\"tashkeel_counts_for_fixed_dev\">"+char_info[1][tash]+"</td>"
    }
    Q_content += "<td><table><tr>"+tash_shape+"</tr><tr>"+tash_count+"</tr></table></td>"
    return "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"
}



function dislay_fixed_div_aya(id)
{
  sura_id = 0//id.split("_")[1]
  aya_id = id.split("_")[3]
  Q_content = "<td class=\"f_col\">"+ Quran_.Swar[sura_id].sura_name+"</td>"
  Q_content += "<td class=\"f_col\">رقم الايه<br>"+Quran_.Swar[sura_id].ayat[aya_id].aya_num+"</td>"
  Q_content += "<td class=\"f_col\">عدد الحروف<br>"+Quran_.Swar[sura_id].ayat[aya_id].total_char_count+"</td>"
  tash_shape = ""
  tash_count = ""
  for (var tash in Quran_.Swar[sura_id].ayat[aya_id].tashkeel_counts_for_aya)
  {
    // tashkeel_table += "<h1>"+tash+"  "+Quran_.tashkeel_counts[tash]+"</h1>"
    tash_shape += "<td id=\"tashkeel_for_fixed_dev\">"+tash+"</td>"
    tash_count += "<td id=\"tashkeel_counts_for_fixed_dev\">"+Quran_.Swar[sura_id].ayat[aya_id].tashkeel_counts_for_aya[tash]+"</td>"
  }
  Q_content += "<td><table><tr>"+tash_shape+"</tr><tr>"+tash_count+"</tr></table></td>"
  return "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"
}


function display_fixed_div_char_in_sura(id)
{
  sura_id = 0//id.split("_")[1]
  aya_id = id.split("_")[3]
  char_id = id.split("_")[5]
  Q_content = "<td class=\"f_col\">"+ Quran_.Swar[sura_id].sura_name+"</td>"
  Q_content += "<td class=\"f_col\">رقم الايه<br>"+Quran_.Swar[sura_id].ayat[aya_id].aya_num+"</td>"
  Q_content += "<td class=\"f_col\"> عدد الحروف<br>"+get_current_system()[char_id].name+" : "+Quran_.Swar[sura_id].ayat[aya_id].systems[current_system].groups[char_id].count+"</td>"
  tash_shape = ""
  tash_count = ""
  for (var tash in Quran_.Swar[sura_id].ayat[aya_id].systems[current_system].groups[char_id].tashkeel)
  {
    // tashkeel_table += "<h1>"+tash+"  "+Quran_.tashkeel_counts[tash]+"</h1>"
    tash_shape += "<td id=\"tashkeel_for_fixed_dev\">"+tash+"</td>"
    tash_count += "<td id=\"tashkeel_counts_for_fixed_dev\">"+Quran_.Swar[sura_id].ayat[aya_id].systems[current_system].groups[char_id].tashkeel[tash]+"</td>"
  }
  Q_content += "<td><table><tr>"+tash_shape+"</tr><tr>"+tash_count+"</tr></table></td>"
  return "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"
}



function display_content_of_fixed_div(id)
{
    console.log(id)
    $("#fixed_div").children("*").remove();
    var char_test = new RegExp('char_[0-9]+')
    var sura_test = new RegExp('sura_[0-9]+')
    var aya_test = new RegExp('(sura_[0-9]+)(_aya_)([0-9]+)')
    var char_counts_test = new RegExp('(sura_[0-9]+)(_aya_[0-9]+)(_char_[0-9]+)')
    content = ""
    
    if(all_info_mode)
    {
	if( id == "total_Quran_info" ||
	    id == "total_ayat_info"   ||
	    id == "all_aya") 
	{
	    content = display_fixed_div_all_quran()
	}else if( char_test.test(id) ){
	    char_id = id.split("_")[1]
	    Q_content = "<td class=\"f_col\">"+ get_current_system()[char_id].name +"</td>"
	    Q_content += "<td class=\"f_col\"> عدد الحروف<br>"+All_Quran_info_.systems[current_system].groups[char_id].count+"</td>"
	    tash_shape = ""
	    tash_count = ""
	    for (var tash in All_Quran_info_.systems[current_system].groups[char_id].tashkeel)
	    {
		// tashkeel_table += "<h1>"+tash+"  "+Quran_.tashkeel_counts[tash]+"</h1>"
		tash_shape += "<td id=\"tashkeel_for_fixed_dev\">"+tash+"</td>"
		tash_count += "<td id=\"tashkeel_counts_for_fixed_dev\">"+All_Quran_info_.systems[current_system].groups[char_id].tashkeel[tash]+"</td>"
	    }
	    Q_content += "<td><table><tr>"+tash_shape+"</tr><tr>"+tash_count+"</tr></table></td>"
	    content = "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"
	    
	}
	$("#fixed_div").append(content)
    }else{
	//display all Quran content
	if( id == "total_Quran_info")
	{
            //content = display_fixed_div_all_quran()
	    content = display_fixed_div_sura(id)
	}
	else if (id == "total_ayat_info") {

            //content = display_fixed_div_all_quran()
	    content = display_fixed_div_sura(id)
	}
	//display specific char in specific aya content
	else if (char_counts_test.test(id)) {
            // content = "<h1>char_counts ----    "+id+"</h1>"
            content = display_fixed_div_char_in_sura(id)
	}
	//display aya content
	else if (aya_test.test(id)) {
            $("."+id).addClass('click_class');
            content = dislay_fixed_div_aya(id)
	}
	//display sura content
	else if (sura_test.test(id)) {
            content = display_fixed_div_sura(id)
	}
	//display char clicked content
	else if (char_test.test(id)){
            char_id = id.split("_")[1]
            $(".clicked"+char_id).addClass('click_class');
            content = display_fixed_div_char(id)
	}
	$("#fixed_div").append(content)
    }
}


function genrate_List(list, name, class_, current)
{
    content=''
    for ( i = 0; i < list.length; i++ )
    {
	if (i == current)
	    content+= '<option selected="selected">'+(i+1)+":"+list[i]+'</option>'
	else
	    content+= '<option>'+(i+1)+" : "+list[i]+'</option>'
    }
    content='<h6>'+name+' : <select class=\''+class_+'\'>'+content+'</select></h6>'
    return content
}





var main = function(){
    $( ".pre-head" ).empty();
    $( ".head" ).empty();
    $( ".swar" ).empty();
    $('.pre-head').append(genrate_List(All_Quran_info_.systems_info, "Systems", "select-system", current_system));
    $('.pre-head').append(genrate_List(All_Quran_info_.swar_names, "Swar", "select-sura", current_sura))
    $('.head').append(generat_head_cell("sura name","column100 column1","column1","total_Quran_info"));
    $('.head').append(generat_head_cell("aya num","column100 column2","column2","total_ayat_info"));
    var start = 3
    system = get_current_system()
    for (i = 0; i < system.length ; i++) {
	$('.head').append(generat_head_cell(system[i].name,"column100 column"+(i+start),'column'+(i+start),"char_"+i));
    }

    if(current_sura != 0){
	all_info_mode = false
	ayat_num_that_visualized = 0;
	i = 0
	the_end_swar = false
	if (Quran_ == "")  the_end_swar = true
	while(ayat_num_that_visualized != start_with_ayat_num && !the_end_swar){
	    // to check if i == swar num to end the loop
	    if(i+1 <= Quran_.Swar.length){
		curent_sura_num = i;
		if(Quran_.Swar[i].ayat.length < start_with_ayat_num-ayat_num_that_visualized){
		    $('.swar').append(generat_sura_row(Quran_.Swar[i],0,Quran_.Swar[i].ayat.length)[0])
		    ayat_num_that_visualized += Quran_.Swar[i].ayat.length;
		    end_render = Quran_.Swar[i].ayat.length
		    i++; 
		}
		else{
		    $('.swar').append(generat_sura_row(Quran_.Swar[i], 0, start_with_ayat_num-ayat_num_that_visualized)[0])
		    end_render = start_with_ayat_num-ayat_num_that_visualized
		    ayat_num_that_visualized += start_with_ayat_num-ayat_num_that_visualized
		}
	    }
	    else {
		the_end_swar = true
	    }
	}// end rendering loop
    } else {
	// render all-info mode
	$('.swar').append(show_all_info_mode())
	all_info_mode = true
    }
    
    
    $('.hov_cell , .table_char , .head.column100').click(function() {
	console.log($(this))
	$("*").removeClass('click_class');
	$(this).addClass('click_class');
	display_content_of_fixed_div($(this).attr('id'));
    });

    $('.select-system').on('change', function (e) {
	current_system = $("select")[0].selectedIndex;
	system_change_state = true
	// to make dinamic rendering
	start_with_ayat_num = 13
	end_render = 0
	step_render = 4
	curent_sura_num = 0
	num_of_steps_down = 0
	num_of_steps_up = 0
	the_end_of_ayat = false;
	the_begin_of_ayat = true;
	lastScrollTop = 0
	ayat_in_table = start_with_ayat_num
	sura_num_to_remove_from_top = 0
	main()
    });


    $('.select-sura').on('change', function (e) {
	current_sura = $("select")[1].selectedIndex;
	// to make dinamic rendering
	start_with_ayat_num = 13
	end_render = 0
	step_render = 4
	curent_sura_num = 0
	num_of_steps_down = 0
	num_of_steps_up = 0
	the_end_of_ayat = false;
	the_begin_of_ayat = true;
	lastScrollTop = 0
	ayat_in_table = start_with_ayat_num
	sura_num_to_remove_from_top = 0
	if(current_sura == 0) main()
	else xmltes(current_sura)
    });
};


// to make dinamic rendering
start_with_ayat_num = 13
end_render = 0
step_render = 4
curent_sura_num = 0
num_of_steps_down = 0
num_of_steps_up = 0
the_end_of_ayat = false;
the_begin_of_ayat = true;
lastScrollTop = 0
sura_num_to_remove_from_top = 0
ayat_in_table = start_with_ayat_num
all_info_mode = false


//  auto-genrate new ayat with scroll
$(document).ready(function() {
  var win = $('.wrap-table100');
  scroll_down_done = false;
  // Each time the user scrolls
  win.scroll(function() {
    // Vertical end reached?
    var st = $(this).scrollTop();
    //check if scroll down
    if($('.table100').height() - win.height() < win.scrollTop() && !all_info_mode){
       check_if_append_nodes_down = false;
       check_if_append_nodes_up = false;
       // downscroll code
       if (!the_end_of_ayat)
       {
         // check if exist enough ayat to genrate
         if((end_render+step_render <= Quran_.Swar[curent_sura_num].ayat.length)){
           ayat_content = generat_sura_row(Quran_.Swar[curent_sura_num], end_render, end_render+step_render)[1]
           for( i=0; i< ayat_content.length; i++){
             $(".column"+(i+1)).find("."+Quran_.Swar[curent_sura_num].sura_name+"_table").children('tbody').append(ayat_content[i])
           }
           end_render += step_render
           num_of_steps_down +=1
           check_if_append_nodes_down = true;
           ayat_in_table += step_render
         }
         //check if no enough ayat to genrate
         else if((end_render+step_render > Quran_.Swar[curent_sura_num].ayat.length)){
           if( Quran_.Swar[curent_sura_num].ayat.length != end_render ){
             ayat_content = generat_sura_row(Quran_.Swar[curent_sura_num], end_render, Quran_.Swar[curent_sura_num].ayat.length)[1]
             for( i=0; i< ayat_content.length; i++){
               $(".column"+(i+1)).find("."+Quran_.Swar[curent_sura_num].sura_name+"_table").children('tbody').append(ayat_content[i])
             }
             num_of_rest_ayat_that_not_visualised = step_render - (Quran_.Swar[curent_sura_num].ayat.length - end_render);
             ayat_in_table += (step_render-num_of_rest_ayat_that_not_visualised)
             end_render += (step_render-num_of_rest_ayat_that_not_visualised)
           }
           else{
             num_of_rest_ayat_that_not_visualised = step_render
           }
           if(Quran_.Swar.length != curent_sura_num+1){
             curent_sura_num += 1
             $('.swar').append(generat_sura_row(Quran_.Swar[curent_sura_num], 0, num_of_rest_ayat_that_not_visualised)[0])
             end_render = num_of_rest_ayat_that_not_visualised
             ayat_in_table += end_render
           }
           else{
             the_end_of_ayat = true;
           }
           num_of_steps_down +=1
           check_if_append_nodes_down = true;
         }
         // check if append nodes down to remove some nodes from top
         if(check_if_append_nodes_down && ayat_in_table >= 16+step_render){
           children_nodes = $(".column"+(1)).find("."+Quran_.Swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').children('tr')
           if (children_nodes.length > step_render){
               for (i=0; i< (Quran_.systems_info[current_system]+2); i++){
                 children_nodes = $(".column"+(i+1)).find("."+Quran_.Swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').children('tr')
                 children_nodes.slice(0,step_render).remove();
               }
           }
           else{
               num_of_rest_nodes = step_render - children_nodes.length
               $(".swar").find("."+Quran_.Swar[sura_num_to_remove_from_top].sura_name).remove();
               sura_num_to_remove_from_top +=1
               for (i=0; i< (Quran_.systems_info[current_system]+2); i++){
                 children_nodes = $(".column"+(i+1)).find("."+Quran_.Swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').children('tr')
                 children_nodes.slice(0,num_of_rest_nodes).remove();
               }
           }
           num_of_steps_down = 0
           ayat_in_table -= step_render
           the_begin_of_ayat = false;
         }
         $('.hov_cell , .table_char , .head.column100').click(function() {
             $("*").removeClass('click_class');
             $(this).addClass('click_class');
             display_content_of_fixed_div($(this).attr('id'));
         });
         scroll_down_done = true;
       }
     // check if scroll up
   } else if( st - lastScrollTop < 0 && st < 140 && scroll_down_done && !all_info_mode){
         children_nodes = $(".column"+(1)).find("."+Quran_.Swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').children('tr')
         first_aya = (parseInt(children_nodes.slice(0,1).attr('id').split("_")[3])+1);
         if (!the_begin_of_ayat){
            //check if exsist enough ayat to render up
           if( first_aya > step_render){
              ayat_content = generat_sura_row(Quran_.Swar[sura_num_to_remove_from_top], first_aya-step_render-1, first_aya-1)[1]
              for( i=0; i< ayat_content.length; i++){
                  $(".column"+(i+1)).find("."+Quran_.Swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').prepend(ayat_content[i])
              }
              ayat_in_table += step_render
              num_of_steps_up += 1
           }
           //check if  no  enough ayat to render up
           else{
              if(first_aya != 1)
              {
                ayat_content = generat_sura_row(Quran_.Swar[sura_num_to_remove_from_top], 0, first_aya-1)[1]
                for( i=0; i< ayat_content.length; i++){
                    $(".column"+(i+1)).find("."+Quran_.Swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').prepend(ayat_content[i])
                }
                num_of_rest_ayat_that_not_visualised = step_render - first_aya
                ayat_in_table += (step_render-num_of_rest_ayat_that_not_visualised)
                num_of_steps_up += 1
              }
              else{
                num_of_rest_ayat_that_not_visualised = step_render
              }
              if(sura_num_to_remove_from_top != 0)
              {
                sura_num_to_remove_from_top-=1
                sura_len = Quran_.Swar[sura_num_to_remove_from_top].ayat.length
                if((sura_len-num_of_rest_ayat_that_not_visualised) <= 0){
                    ayat_content = generat_sura_row(Quran_.Swar[sura_num_to_remove_from_top], 0 , sura_len)
                    ayat_in_table += sura_len
                }
                else {
                    ayat_content = generat_sura_row(Quran_.Swar[sura_num_to_remove_from_top], sura_len-num_of_rest_ayat_that_not_visualised-1 , sura_len)
                    ayat_in_table += num_of_rest_ayat_that_not_visualised
                }
                $('.swar').prepend(ayat_content[0])
                num_of_steps_up += 1
              }
              else {
                the_begin_of_ayat = true;
              }
           }//end of else of  no  enough ayat

           // check if append nodes down to remove some nodes from bottom
           if(num_of_steps_up == 1 || ayat_in_table >= 13+step_render){
             children_nodes = $(".column"+(1)).find("."+Quran_.Swar[curent_sura_num].sura_name+"_table").children('tbody').children('tr')
             children_nodes_len = children_nodes.length
             if (children_nodes_len > step_render){
               for (i=0; i< (Quran_.systems_info[current_system]+2); i++){
                 children_nodes = $(".column"+(i+1)).find("."+Quran_.Swar[curent_sura_num].sura_name+"_table").children('tbody').children('tr')
                 children_nodes.slice(children_nodes_len-step_render,children_nodes_len).remove();
               }
               end_render -= step_render
             }
             else{
               $(".swar").find("."+Quran_.Swar[curent_sura_num].sura_name).remove();
               curent_sura_num -= 1
               num_of_rest_nodes = step_render - children_nodes_len
               if(num_of_rest_nodes != 0){
                 for (i=0; i< (Quran_.systems_info[current_system]+2); i++){
                   children_nodes = $(".column"+(i+1)).find("."+Quran_.Swar[curent_sura_num].sura_name+"_table").children('tbody').children('tr')
                   children_nodes.slice(children_nodes.length - num_of_rest_nodes,children_nodes.length).remove();
                 }
                 end_render = Quran_.Swar[curent_sura_num].ayat.length - num_of_rest_nodes
               }
               else {
                 end_render = Quran_.Swar[curent_sura_num].ayat.length
               }

             }
             num_of_steps_up = 0
             ayat_in_table -= step_render
             the_end_of_ayat = false;
           }

           $('.hov_cell , .table_char , .head.column100').click(function() {
               $("*").removeClass('click_class');
               $(this).addClass('click_class');
               display_content_of_fixed_div($(this).attr('id'));
           });
         }// end  condition of begin ayat
     }
     lastScrollTop = st;
     console.log("ayat_in_table  : " + ayat_in_table);
  });
});




function pre_xmltes()
{
    parser = new DOMParser();
    $xml = $( $.parseXML( all_quran_info_source ) );
    total_char_count_in_quran = $xml.find('Quran').attr('total_char_count')
    ayat_num = $xml.find('Quran').attr('ayat_num')
    swar_names = ('All,'+$xml.find('swar_name').text()).split(',')

    systems = []
    $xml.find("systems").find("count_system").each(function(){
	chars_of_system = []
	chars = $(this).text().split("|")
	chars.forEach(function(char_str){
	    char_name = char_str.split('*')[0]
	    char_count = Number(char_str.split('*')[2])
	    tashkeel_ = {}
	    tashkeel_of_chars = char_str.split('*')[3].split(",")
	    tashkeel_of_chars.forEach(function(tashkeel_info){
		tashkeel_info = tashkeel_info.split(":")
		tashkeel_[tashkeel_info[0]] = Number(tashkeel_info[1])
	    })
            chars_of_system.push(new char(char_name,char_count,tashkeel_))
	})
	systems.push(new system_class(chars_of_system))
    })
    count_tashkeel = $xml.find('count_tashkeel').text().split(',')
    all_count_tashkeel = {}
    count_tashkeel.forEach(function(tashkeel_info){
	tashkeel_info = tashkeel_info.split(":")
	all_count_tashkeel[tashkeel_info[0]] = Number(tashkeel_info[1])
    })

    All_Quran_info_ = new Total_Quran_info(swar_names,
					   systems,
					   all_count_tashkeel,
					   total_char_count_in_quran,
					   ayat_num)
    xmltes(1)
}

function xmltes(sura_num){
    //if(sura_num == 1){data = data1}
    //if(sura_num == 2){data = data2}
    $.when(
	$.getScript( "https://moroclash.github.io/test.github.io/Quran-content/"+sura_num+".js" ),
	$.Deferred(function( deferred ){
            $( deferred.resolve );
	})
    ).done(function(){
	parser = new DOMParser();
	$xml = $( $.parseXML( data ) );
	total_char_count_in_quran = $xml.find('frequency').attr('total_char_count_in_quran')
	swar_num = $xml.find('frequency').attr('swar_num')
	ayat_num = $xml.find('frequency').attr('ayat_num')
	swar = []
	//collect sura data
	$xml.find("sura").each(function(){
	    sura_name = $(this).attr('name')
	    sura_num = $(this).attr('number')
	    char_count_in_sura = Number($(this).attr('total_char_count_in_sura'))
	    ayat = []
	    //collect aya data
	    $(this).find('aya').each(function(){
		aya_num = $(this).attr('number')
		char_count_of_aya= Number($(this).attr('total_char_count_in_aya'))
		chars = []
		tashkeel = {}
		systems = []
		//collect char data

		chars_str = $(this).find('count_alphabet').text()
		chars_str = chars_str.split('|')
		chars_str.forEach(function(char_str){
		    char_str = char_str.split("*")
		    char_name = char_str[0]
		    char_count = Number(char_str[1])
		    char_tashkeel = {}

		    //collect taskeel of char
		    tashkels = char_str[2]
		    tashkels  = tashkels.split(',')
		    tashkels.forEach(function(tashkeel_info){
			tashkeel_info = tashkeel_info.split(":")
			char_tashkeel[tashkeel_info[0]] = Number(tashkeel_info[1])
		    })

		    char_ = new char(char_name,char_count,char_tashkeel)
		    chars.push(char_)
		})


		//collect tashkeel info of aya
		tashkels = $(this).find('count_tashkeel').text()
		tashkels  = tashkels.split(',')
		tashkels.forEach(function(tashkeel_info){
		    tashkeel_info = tashkeel_info.split(":")
		    tashkeel[tashkeel_info[0]] = Number(tashkeel_info[1])
		})

		// ----------------------
		//collect systems of aya
		$(this).find('systems').find('count_system').each(function(){

		    groups_str = $(this).text()
		    groups_str = groups_str.split("|")
		    groups = []
		    //collect of system groups
		    groups_str.forEach(function(group_str){
			group_str = group_str.split("*")
			group_name = group_str[0]
			group_count = Number(group_str[2])
			group_tashkeel = {}

			//collect taskeel of group
			tashkels = group_str[3]
			tashkels  = tashkels.split(',')
			tashkels.forEach(function(tashkeel_info){
			    tashkeel_info = tashkeel_info.split(":")
			    group_tashkeel[tashkeel_info[0]] = Number(tashkeel_info[1])
			})

			group_ = new char(group_name,group_count,group_tashkeel)
			groups.push(group_)
		    })
		    system_ = new system_class(groups)
		    systems.push(system_)
		})
		// ----------------------

		aya_ = new aya_class(aya_num, char_count_of_aya, chars,tashkeel,systems)
		ayat.push(aya_)
	    });
	    sura_ = new sura(sura_name,sura_num,char_count_in_sura,ayat)
	    swar.push(sura_)
	});
	Quran_ = new Quran(total_char_count_in_quran,swar);
	var t0 = performance.now();
	current_sura = sura_num
	main()
	var t1 = performance.now();
	console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    });
}

$(document).ready(pre_xmltes)
