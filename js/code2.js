function aya_class(num_unique_words, total_num_unique_words, aya, frequency, aya_num){
  this.num_unique_words = num_unique_words;
  this.total_num_unique_words = total_num_unique_words;
  this.aya = aya
  this.frequency = frequency
  this.aya_num = aya_num
}

function sura(sura_name, num_all_words, num_unique_words, ayat, ayat_num, unique_words){
  this.sura_name = sura_name;
  this.num_all_words = num_all_words;
  this.ayat_num = ayat_num;
  this.unique_words = unique_words;
  //array
  this.ayat = ayat;
}

function Quran(total_words_num, num_unique_words, total_ayat_num, swar, swar_names){
  this.total_words_num = total_words_num;
  this.num_unique_words = num_unique_words;
  this.total_ayat_num = total_ayat_num;
  this.swar = swar;
  this.swar_names = swar_names
}


function generat_head_cell(text,class_s,data_column,id,tashkeel_flage){
    // console.log();
    if(tashkeel_flage)
    {
	content = "<table><tr><th id=\"character-text\" class=\"column100\">"+text+"</th></tr></table>"
	return "<th id=\""+id+"\" class=\""+class_s+" table_char  no_pading stickyheader hov_cell\" data-column=\""+data_column+"\">"+content+"</th>"
    }
    return "<th id=\""+id+"\" class=\""+class_s+" stickyheader hov_cell\" data-column=\""+data_column+"\">"+text+"</th>"
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
          //tashkeel_cahars+="<td id=\"tashkeel_shape\" class=\"column100\">"+tshkl+"</td>"
          tashkeel_counts+="<td id=\"tashkeel_shape_count\" class=\"column100\">"+tashkeel_dictionary[tshkl]+"</td>"
        }
	//char_content = "<tr>"+tashkeel_cahars+"</tr>"+"<tr>"+tashkeel_counts+"</tr>"
        char_content = "<tr>"+tashkeel_counts+"</tr>"
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
  sura_id = "sura_"+0
  // ---------------------------------------------

  //***************make words cell --  class aya **************************
  table_content = ""
  for(j = start_pos; j < end_pos; j++){
    word_id = sura_id+"_word_"+j
    table_content += "<tr id=\""+word_id+"\" class=\"word"+j+" hov_cell word\"><td>"+sura_info.unique_words[j]+"</td></tr>"
  }
    content.push(table_content)
  ayat_small_table = "<table class=\""+sura_info.sura_name+"_table word\">"+table_content+"</table>"
  sura_body = "<td class=\"column100 column1 "+sura_info.sura_name+" char_cell\" data-column=\"column1\">"+ayat_small_table+"</td>"
  //*****************************************************************

  //*************make char's cell ************************************
  for(j = 0; j < sura_info.ayat_num; j++){
    table_content = ""
    for(n = start_pos; n < end_pos; n++){
      aya = sura_info.ayat[j]
      words_counts ="<td id=\"tashkeel_shape_count\" class=\"column100\">"+aya.frequency[n]+"</td>"
      char_content = "<tr>"+words_counts+"</tr>"
      table_char_id = sura_id+"_word_"+n+"_aya_"+j
      table_chars_content = "<table id=\""+table_char_id+"\" class=\"char_counts_table table_char "+sura_id+"_word_"+n+" clicked"+j+"\">"+char_content+"</table>"
      table_content += "<tr class=\"word"+n+"\"><td>"+table_chars_content+"</td></tr>"
    }
    content.push(table_content)
    alphabet_content = "<table class=\""+sura_info.sura_name+"_table\">"+table_content+"</table>"
    sura_body += "<td class=\"column100 column"+(j+2)+" "+sura_info.sura_name+" char_cell\" data-column=\"column"+(j+2)+"\">"+alphabet_content+"</td>"
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
  for( i = 0; i < Quran_.swar.length; i++)
  {
    for( n = 0; n < Quran_.swar[i].ayat.length; n++)
    {
      aya = Quran_.swar[i].ayat[n]
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


function get_fixed_div_tashkeel_part(__tashkeel)
{
    tash_shape = ""
    tash_count = ""

    coun = 1
    for (var tash in __tashkeel)
    {
	    tshkl = "<img class=\"taskeel-images\" src=\'./images/"+coun+".png\'/>"
	    tash_shape += "<td id=\"tashkeel_for_fixed_dev\">"+tshkl+"</td>"
	    tash_count += "<td id=\"tashkeel_counts_for_fixed_dev\">"+__tashkeel[tash]+"</td>"
	    coun++
    }
    return [tash_shape,tash_count]
}


function display_fixed_div_all_quran()
{
    Q_content = "<td class=\"f_col\">عدد السور<br>"+ All_Quran_info_.swar_num +"</td>"
    Q_content += "<td class=\"f_col\">عدد الآيات<br>"+ All_Quran_info_.ayat_num +"</td>"
    Q_content += "<td class=\"f_col\">عدد الحروف<br>"+ All_Quran_info_.total_char_count_in_quran +"</td>"
    tash = get_fixed_div_tashkeel_part(All_Quran_info_.tashkeels)
    Q_content += "<td><table><tr>"+tash[0]+"</tr><tr>"+tash[1]+"</tr></table></td>"
    return  "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"
}


function display_fixed_div_sura(id)
{
    sura_id = 0//id.split("_")[1]
    Q_content = "<td class=\"f_col\">"+ Quran_.swar[sura_id].sura_num+" :: "+Quran_.swar[sura_id].sura_name +"</td>"
    Q_content += "<td class=\"f_col\">عدد الآيات<br>"+ Quran_.swar[sura_id].ayat.length +"</td>"
    Q_content += "<td class=\"f_col\">عدد الحروف<br>"+ Quran_.swar[sura_id].char_count_in_sura +"</td>"
    sura_tashkell_count = {}
    for( i = 0; i < Quran_.swar[sura_id].ayat.length; i++)
    {
	aya_dic = Quran_.swar[sura_id].ayat[i].tashkeel_counts_for_aya
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
    tash = get_fixed_div_tashkeel_part(sura_tashkell_count)
    Q_content += "<td><table><tr>"+tash[0]+"</tr><tr>"+tash[1]+"</tr></table></td>"
    return "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"
}


function display_fixed_div_char(id)
{
    char_id = id.split("_")[1]
    Q_content = "<td class=\"f_col\">"+ Quran_.swar[0].sura_name+"</td>"
    Q_content += "<td class=\"f_col\">"+ get_current_system()[char_id].name +"</td>"
    //return [char_count,{ taskeel1:cont , taskeel2:cont ..... }]
    char_info = get_char_info(char_id)
    Q_content += "<td class=\"f_col\">عدد الحروف<br>"+ char_info[0] +"</td>"
    tash = get_fixed_div_tashkeel_part(char_info[1])
    Q_content += "<td><table><tr>"+tash[0]+"</tr><tr>"+tash[1]+"</tr></table></td>"
    return "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"
}



function dislay_fixed_div_aya(id)
{
    sura_id = 0//id.split("_")[1]
    aya_id = id.split("_")[3]
    Q_content = "<td class=\"f_col\">"+ Quran_.swar[sura_id].sura_name+"</td>"
    Q_content += "<td class=\"f_col\">رقم الآية<br>"+Quran_.swar[sura_id].ayat[aya_id].aya_num+"</td>"
    Q_content += "<td class=\"f_col\">عدد الحروف<br>"+Quran_.swar[sura_id].ayat[aya_id].total_char_count+"</td>"
    tash = get_fixed_div_tashkeel_part(Quran_.swar[sura_id].ayat[aya_id].tashkeel_counts_for_aya)
    Q_content += "<td><table><tr>"+tash[0]+"</tr><tr>"+tash[1]+"</tr></table></td>"
    return "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"
}


function display_fixed_div_char_in_sura(id)
{
    sura_id = 0//id.split("_")[1]
    aya_id = id.split("_")[3]
    char_id = id.split("_")[5]
    Q_content = "<td class=\"f_col\">"+ Quran_.swar[sura_id].sura_name+"</td>"
    Q_content += "<td class=\"f_col\">رقم الآية<br>"+Quran_.swar[sura_id].ayat[aya_id].aya_num+"</td>"
    Q_content += "<td class=\"f_col\">عدد الحروف<br>"+get_current_system()[char_id].name+" : "+Quran_.swar[sura_id].ayat[aya_id].systems[current_system].groups[char_id].count+"</td>"
    tash = get_fixed_div_tashkeel_part(Quran_.swar[sura_id].ayat[aya_id].systems[current_system].groups[char_id].tashkeel)
    Q_content += "<td><table><tr>"+tash[0]+"</tr><tr>"+tash[1]+"</tr></table></td>"
    return "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"
}



function display_content_of_fixed_div(id)
{
  console.log(id)
  $("#fixed_div").children("*").remove();
  var aya_test = new RegExp('aya_[0-9]+')
  var sura_test = new RegExp('sura_[0-9]+')
  var word_test = new RegExp('(sura_[0-9]+)(_word_)([0-9]+)')
  var word_counts_test = new RegExp('(sura_[0-9]+)(_word_[0-9]+)(_aya_[0-9]+)')
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
	  Q_content += "<td class=\"f_col\">عدد الحروف<br>"+All_Quran_info_.systems[current_system].groups[char_id].count+"</td>"
	  tash = get_fixed_div_tashkeel_part(All_Quran_info_.systems[current_system].groups[char_id].tashkeel)
	  Q_content += "<td><table><tr>"+tash[0]+"</tr><tr>"+tash[1]+"</tr></table></td>"
	  content = "<table class=\"All_Quran_info\"><tr>"+Q_content+"</tr></table>"

	}
    $("#fixed_div").append(content)
  }else{
    //display all Quran content
    if( id == "total_Quran_info")
    {
      //content = display_fixed_div_all_quran()
      //----- content = display_fixed_div_sura(id)
    }
    else if (id == "total_ayat_info") {

      //content = display_fixed_div_all_quran()
      //----- content = display_fixed_div_sura(id)
    }
    //display specific char in specific aya content
    else if (word_counts_test.test(id)) {
      // content = "<h1>char_counts ----    "+id+"</h1>"
      //----- content = display_fixed_div_char_in_sura(id)
    }
    //display aya content
    else if (word_test.test(id)) {
      $("."+id).addClass('click_class');
      //----- content = dislay_fixed_div_aya(id)
    }
    //display sura content
    else if (sura_test.test(id)) {
      //----- content = display_fixed_div_sura(id)
    }
    //display char clicked content
    else if (aya_test.test(id)){
      char_id = id.split("_")[1]
      $(".clicked"+char_id).addClass('click_class');
      //----- content = display_fixed_div_char(id)

    }
    //----- $("#fixed_div").append(content)
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
  $('.pre-head').append(genrate_List(Quran_.swar_names, "Swar", "select-sura", current_sura))
  $('.head').append(generat_head_cell("الكلمات","column100 column1","column1","total_Quran_info",false));

  var start = 2
  sura = Quran_.swar[current_sura-1]
  for (i = 0; i < sura.ayat_num ; i++) {
    $('.head').append(generat_head_cell(i+1 ,"column100 column"+(i+start),'column'+(i+start),"aya_"+i,true));
  }

  if(current_sura != 0){
    all_info_mode = false
    ayat_num_that_visualized = 0;
    i = 0
    the_end_swar = false
    if (Quran_ == "")  the_end_swar = true
    while(ayat_num_that_visualized != start_with_ayat_num && !the_end_swar){
      // to check if i == swar num to end the loop
      if(i+1 <= Quran_.swar.length){
	curent_sura_num = i;
	if(Quran_.swar[i].unique_words.length < start_with_ayat_num-ayat_num_that_visualized){
	  $('.swar').append(generat_sura_row(Quran_.swar[i], 0, Quran_.swar[i].unique_words.length)[0])
	  ayat_num_that_visualized += Quran_.swar[i].unique_words.length;
	  end_render = Quran_.swar[i].unique_words.length
	  i++;
	}
	else{
	  $('.swar').append(generat_sura_row(Quran_.swar[i], 0, start_with_ayat_num-ayat_num_that_visualized)[0])
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
    start_with_ayat_num = 19
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
    start_with_ayat_num = 19
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
start_with_ayat_num = 15
end_render = 0
step_render = 5
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
        if((end_render+step_render <= Quran_.swar[curent_sura_num].unique_words.length)){
          ayat_content = generat_sura_row(Quran_.swar[curent_sura_num], end_render, end_render+step_render)[1]
          for( i=0; i< ayat_content.length; i++){
            $(".column"+(i+1)).find("."+Quran_.swar[curent_sura_num].sura_name+"_table").children('tbody').append(ayat_content[i])
          }
          end_render += step_render
          num_of_steps_down +=1
          check_if_append_nodes_down = true;
          ayat_in_table += step_render
        }
        //check if no enough ayat to genrate
        else if((end_render+step_render > Quran_.swar[curent_sura_num].unique_words.length)){

          if( Quran_.swar[curent_sura_num].unique_words.length != end_render ){

            ayat_content = generat_sura_row(Quran_.swar[curent_sura_num], end_render, Quran_.swar[curent_sura_num].unique_words.length)[1]
            for( i=0; i< ayat_content.length; i++){
               $(".column"+(i+1)).find("."+Quran_.swar[curent_sura_num].sura_name+"_table").children('tbody').append(ayat_content[i])
            }
            num_of_rest_ayat_that_not_visualised = step_render - (Quran_.swar[curent_sura_num].unique_words.length - end_render);
            ayat_in_table += (step_render-num_of_rest_ayat_that_not_visualised)
            end_render += (step_render-num_of_rest_ayat_that_not_visualised)
          }
          else{
            num_of_rest_ayat_that_not_visualised = step_render
          }
          if(Quran_.swar.length != curent_sura_num+1){
            curent_sura_num += 1
             $('.swar').append(generat_sura_row(Quran_.swar[curent_sura_num], 0, num_of_rest_ayat_that_not_visualised)[0])
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
        if(check_if_append_nodes_down && ayat_in_table >= 25+step_render){
          children_nodes = $(".column"+(1)).find("."+Quran_.swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').children('tr')
          if (children_nodes.length > step_render){
            for (i=0; i< (Quran_.systems_info[current_system]+2); i++){
              children_nodes = $(".column"+(i+1)).find("."+Quran_.swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').children('tr')
              children_nodes.slice(0,step_render).remove();
            }
          }
          else{
            num_of_rest_nodes = step_render - children_nodes.length
            $(".swar").find("."+Quran_.swar[sura_num_to_remove_from_top].sura_name).remove();
            sura_num_to_remove_from_top +=1
            for (i=0; i< (Quran_.systems_info[current_system]+2); i++){
                 children_nodes = $(".column"+(i+1)).find("."+Quran_.swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').children('tr')
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
    } else if((st < 90 && !all_info_mode) || (st - lastScrollTop < 0 && st < 90 && scroll_down_done && !all_info_mode)){
      children_nodes = $(".column"+(1)).find("."+Quran_.swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').children('tr')
      first_aya = (parseInt(children_nodes.slice(0,1).attr('id').split("_")[3])+1);
      if (!the_begin_of_ayat){
        //check if exsist enough ayat to render up
        if( first_aya > step_render){
          ayat_content = generat_sura_row(Quran_.swar[sura_num_to_remove_from_top], first_aya-step_render-1, first_aya-1)[1]
          for( i=0; i< ayat_content.length; i++){
            $(".column"+(i+1)).find("."+Quran_.swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').prepend(ayat_content[i])
          }
          ayat_in_table += step_render
          num_of_steps_up += 1
        }
        //check if  no  enough ayat to render up
        else{
          if(first_aya != 1)
          {
            ayat_content = generat_sura_row(Quran_.swar[sura_num_to_remove_from_top], 0, first_aya-1)[1]
            for( i=0; i< ayat_content.length; i++){
              $(".column"+(i+1)).find("."+Quran_.swar[sura_num_to_remove_from_top].sura_name+"_table").children('tbody').prepend(ayat_content[i])
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
            sura_len = Quran_.swar[sura_num_to_remove_from_top].unique_words.length
            if((sura_len-num_of_rest_ayat_that_not_visualised) <= 0){
              ayat_content = generat_sura_row(Quran_.swar[sura_num_to_remove_from_top], 0 , sura_len)
              ayat_in_table += sura_len
            }
            else {
              ayat_content = generat_sura_row(Quran_.swar[sura_num_to_remove_from_top], sura_len-num_of_rest_ayat_that_not_visualised-1 , sura_len)
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
        if(num_of_steps_up == 1 || ayat_in_table >= 25+step_render){
          children_nodes = $(".column"+(1)).find("."+Quran_.swar[curent_sura_num].sura_name+"_table").children('tbody').children('tr')
          children_nodes_len = children_nodes.length
          if (children_nodes_len > step_render){
            for (i=0; i< (Quran_.systems_info[current_system]+2); i++){
              children_nodes = $(".column"+(i+1)).find("."+Quran_.swar[curent_sura_num].sura_name+"_table").children('tbody').children('tr')
              children_nodes.slice(children_nodes_len-step_render,children_nodes_len).remove();
            }
            end_render -= step_render
          }
          else{
            $(".swar").find("."+Quran_.swar[curent_sura_num].sura_name).remove();
            curent_sura_num -= 1
            num_of_rest_nodes = step_render - children_nodes_len
               if(num_of_rest_nodes != 0){
                 for (i=0; i< (Quran_.systems_info[current_system]+2); i++){
                   children_nodes = $(".column"+(i+1)).find("."+Quran_.swar[curent_sura_num].sura_name+"_table").children('tbody').children('tr')
                   children_nodes.slice(children_nodes.length - num_of_rest_nodes,children_nodes.length).remove();
                 }
                 end_render = Quran_.swar[curent_sura_num].ayat.length - num_of_rest_nodes
               }
            else {
              end_render = Quran_.swar[curent_sura_num].ayat.length
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
  xmltes(1)
}



function xmltes(sura_num){
/*  $.when(
    $.getScript( "https://moroclash.github.io/test.github.io/Quran-words/"+sura_num+".js" ),
    $.Deferred(function( deferred ){
      $( deferred.resolve );
    })
  ).done(function(){*/
    parser = new DOMParser();
    $xml = $( $.parseXML( data ) );

    total_words_num_quran = $xml.find('quran').attr('total_words_num')
    num_uniqe_words_quran = $xml.find('quran').attr('num_unique_words')
    total_ayat_num_quran = $xml.find('quran').attr('total_ayat_num')
    swar_names = []

    swar = []
    //collect sura data
    $xml.find("sura").each(function(){
      sura_name = $(this).attr('name')
      swar_names.push(sura_name)
      num_all_words_sura = Number($(this).attr('num_all_words'))
      num_unique_words_sura = Number($(this).attr('num_unique_words'))
      ayat_num_sura = Number($(this).attr('ayat_num'))
      unique_words = $(this).find('words').text().split(',')

      ayat = []
      //collect aya data
      $(this).find('ayat').find('aya').each(function(){
	num_uniq_words_aya = Number($(this).attr('num_uniq_words'))
        total_unique_words_aya = Number($(this).attr('total_unique_words'))
        aya_content = $(this).attr('aya')
        aya_frequency = $(this).text().split(',')
        aya_num = ayat.length + 1
        aya = new aya_class(num_uniq_words_aya, total_unique_words_aya, aya_content, aya_frequency, aya_num)
        ayat.push(aya)
      })

      sura = new sura(sura_name, num_all_words_sura, num_unique_words_sura, ayat, ayat_num_sura, unique_words)
      swar.push(sura)
    })

    Quran_ = new Quran(total_words_num_quran, num_uniqe_words_quran, total_ayat_num_quran, swar, swar_names);
    var t0 = performance.now();
    current_sura = sura_num
    main()
    var t1 = performance.now();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
  //});
}

$(document).ready(pre_xmltes)
