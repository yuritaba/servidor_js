def funcao(l):

    maior=''
    maiorLen=0

    for i in l:
        for x in l:
            if x != i:
                contador = 0
                string=''
                for p in range(min([len(i), len(x)])):
                    if x[p] == i[p]:
                        contador+=1
                        string+=x[p]
                if contador>maiorLen:
                    maiorLen=contador
                    maior=string
    
    return maior

strings = [
  'cmfproxgutywhxxwibe',
  'cmfprrlbbkgtgroe',
  'etltbscspsuloiok',
  'etltbsdduaicvpy',
  'gwscrncwrrd',
  'gwyqstndytpvxgqpo',
  'mltgdpbqnee',
  'mltgjjwaljlcsjymn',
  'swouukvwia',
  'swutlkocypdioe',
  'ucubdeasjr',
  'ucuogtoj',
  'xnhuawpemjhtauswr',
  'xnhuawppeksqyqim'
]

print(funcao(strings))