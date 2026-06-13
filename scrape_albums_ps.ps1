$urls = @(
  'https://70mmfilmcellar.weebly.com/interstellar.html',
  'https://70mmfilmcellar.weebly.com/interstellar-trailer.html',
  'https://70mmfilmcellar.weebly.com/batman-begins.html',
  'https://70mmfilmcellar.weebly.com/the-dark-knight.html',
  'https://70mmfilmcellar.weebly.com/the-dark-knight-rises.html',
  'https://70mmfilmcellar.weebly.com/dunkirk.html',
  'https://70mmfilmcellar.weebly.com/inception.html'
)

$albums = @()
$pattern = "(?:src|href)=['""](/uploads/[^'""]+\.(?:jpg|png|jpeg)[^'""]*)['""]"

foreach ($url in $urls) {
  $movieName = $url.Split('/')[-1].Replace('.html', '').Replace('-', ' ').ToUpper()
  Write-Host "Fetching $url ..."
  try {
    $html = (Invoke-WebRequest -Uri $url -UseBasicParsing).Content
    
    $matches = [regex]::Matches($html, $pattern, "IgnoreCase")
    $images = @()
    $seenBase = @{}
    
    foreach ($match in $matches) {
      $imgUrl = $match.Groups[1].Value
      if ($imgUrl -match 'logo' -or $imgUrl -match 'weebly') { continue }
      if ($imgUrl -match '-\d{2}-\d{2}-\d{2}-\d{2}') { continue }
      
      $imgUrl = $imgUrl.Split('?')[0]
      if ($imgUrl.StartsWith('/')) {
        $imgUrl = "https://70mmfilmcellar.weebly.com$imgUrl"
      }
      
      $baseName = $imgUrl.Split('/')[-1].Replace('_orig', '')
      
      if (-not $seenBase.ContainsKey($baseName)) {
        $seenBase[$baseName] = $imgUrl
        $images += $imgUrl
      } else {
        if ($imgUrl -match '_orig' -and -not ($seenBase[$baseName] -match '_orig')) {
           $idx = [array]::IndexOf($images, $seenBase[$baseName])
           if ($idx -ge 0) {
             $images[$idx] = $imgUrl
           }
           $seenBase[$baseName] = $imgUrl
        }
      }
    }
    
    if ($images.Count -gt 0) {
      $albums += [pscustomobject]@{
        id = $movieName.ToLower().Replace(' ', '-')
        title = $movieName
        thumbnail = $images[0]
        images = $images
      }
    }
  } catch {
    Write-Host "Error fetching $url"
  }
}

$albums | ConvertTo-Json -Depth 5 | Out-File 'weebly_albums.json' -Encoding utf8
Write-Host "Saved $($albums.Count) albums."
